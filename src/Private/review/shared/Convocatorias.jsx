import { useState, useEffect } from "react";
import Style from "./shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { 
    createConvocatoria, 
    getConvocatorias, 
    getConvocatoriasByProfesor,
    updateConvocatoria,
    deleteConvocatoria,
    incrementViews,
    cerrarYCrearCurso
} from "../../../firebase/services/convocatorias";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import ModalPostulacion from './ModalPostulacion';
import ModalPostulantes from './ModalPostulantes';
import { profesorMenuItems, studentMenuItems } from '../../../utils/menuItems';

function Convocatorias() {
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [convocatorias, setConvocatorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);
    const [showPostulacionModal, setShowPostulacionModal] = useState(false);
    const [showPostulantesModal, setShowPostulantesModal] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        tipo: 'general',
        prioridad: 'normal',
        fechaLimite: '',
        cuposMaximos: '',
        duracion: '',
        fechaInicio: ''
    });

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('userId');
        setUserRole(role);
        setUserId(id);
        
        fetchUserData(id);
        loadConvocatorias(role, id);
    }, []);

    const fetchUserData = async (id) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', id));
            if (userDoc.exists()) {
                setUserName(userDoc.data().name || 'Usuario');
            }
        } catch (error) {
            console.error("Error obteniendo datos del usuario:", error);
        }
    };

    const loadConvocatorias = async (role, id) => {
        setLoading(true);
        try {
            let result;
            if (role === 'profesor') {
                result = await getConvocatoriasByProfesor(id);
            } else {
                result = await getConvocatorias();
            }
            
            if (result.success) {
                setConvocatorias(result.data);
            }
        } catch (error) {
            console.error("Error cargando convocatorias:", error);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.titulo || !formData.descripcion) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        const convocatoriaData = {
            ...formData,
            profesorId: userId,
            profesorNombre: userName
        };

        const result = await createConvocatoria(convocatoriaData);
        
        if (result.success) {
            alert('Convocatoria creada exitosamente');
            setShowModal(false);
            setFormData({
                titulo: '',
                descripcion: '',
                tipo: 'general',
                prioridad: 'normal',
                fechaLimite: '',
                cuposMaximos: '',
                duracion: '',
                fechaInicio: ''
            });
            loadConvocatorias(userRole, userId);
        } else {
            alert('Error al crear la convocatoria: ' + result.error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta convocatoria?')) {
            const result = await deleteConvocatoria(id);
            if (result.success) {
                alert('Convocatoria eliminada');
                loadConvocatorias(userRole, userId);
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const handleCrearCurso = async (convocatoria) => {
        const aceptados = convocatoria.postulantes?.filter(p => p.estado === 'aceptado') || [];
        
        if (aceptados.length === 0) {
            alert('No hay estudiantes aceptados para crear el curso. Debes aceptar al menos un postulante.');
            return;
        }

        const mensaje = `¿Crear curso "${convocatoria.titulo}" con ${aceptados.length} estudiante(s) aceptado(s)?\n\nEsta acción cerrará la convocatoria y creará el curso automáticamente.`;
        
        if (window.confirm(mensaje)) {
            const result = await cerrarYCrearCurso(convocatoria.id);
            if (result.success) {
                alert(`Curso creado exitosamente con ${aceptados.length} estudiante(s)`);
                loadConvocatorias(userRole, userId);
            } else {
                alert('Error al crear curso: ' + result.error);
            }
        }
    };

    const handleViewConvocatoria = async (convocatoria) => {
        setSelectedConvocatoria(convocatoria);
        if (userRole === 'student') {
            await incrementViews(convocatoria.id);
        }
    };

    const handlePostularse = (convocatoria) => {
        setSelectedConvocatoria(convocatoria);
        setShowPostulacionModal(true);
    };

    const handleGestionarPostulantes = (convocatoria) => {
        setSelectedConvocatoria(convocatoria);
        setShowPostulantesModal(true);
    };

    const yaPostulado = (convocatoria) => {
        if (!convocatoria.postulantes) return false;
        return convocatoria.postulantes.some(p => p.estudianteId === userId);
    };

    const getEstadoPostulacion = (convocatoria) => {
        if (!convocatoria.postulantes) return null;
        const postulante = convocatoria.postulantes.find(p => p.estudianteId === userId);
        return postulante ? postulante.estado : null;
    };

    const getPrioridadColor = (prioridad) => {
        switch (prioridad) {
            case 'alta': return '#ff4757';
            case 'media': return '#ffa502';
            case 'normal': return '#1e88e5';
            default: return '#1e88e5';
        }
    };

    const getTipoIcon = (tipo) => {
        switch (tipo) {
            case 'evento':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M3 10h18M8 6V3m8 3V3m-8 7h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                );
            case 'tarea':
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                );
            default:
                return (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                );
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const menuItems = userRole === 'profesor' ? profesorMenuItems : studentMenuItems;

    return (
        <div className={Style.container}>
            <Barra_Left items={menuItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>📢 Convocatorias</h1>
                    <p>{userRole === 'profesor' ? 'Gestiona las convocatorias y anuncios' : 'Revisa las convocatorias y anuncios disponibles'}</p>
                </div>

                <div className={Style.mainSection}>
                    {userRole === 'profesor' && (
                        <button 
                            className={Style.primaryBtn}
                            onClick={() => setShowModal(true)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Crear Nueva Convocatoria
                        </button>
                    )}

                    {loading ? (
                        <div className={Style.loadingState}>
                            <div className={Style.spinner}></div>
                            <p>Cargando convocatorias...</p>
                        </div>
                    ) : convocatorias.length === 0 ? (
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>No hay convocatorias disponibles</p>
                        </div>
                    ) : (
                        <div className={Style.convocatoriasGrid}>
                            {convocatorias.map((conv) => (
                                <div 
                                    key={conv.id} 
                                    className={Style.convocatoriaCard}
                                    style={{ borderLeft: `4px solid ${getPrioridadColor(conv.prioridad)}` }}
                                >
                                    <div className={Style.cardHeader}>
                                        <div className={Style.cardTipo}>
                                            {getTipoIcon(conv.tipo)}
                                            <span>{conv.tipo}</span>
                                        </div>
                                        <span 
                                            className={Style.prioridadBadge}
                                            style={{ background: getPrioridadColor(conv.prioridad) }}
                                        >
                                            {conv.prioridad}
                                        </span>
                                    </div>
                                    
                                    <h3>{conv.titulo || 'Sin título'}</h3>
                                    <p className={Style.descripcion}>
                                        {conv.descripcion ? conv.descripcion.substring(0, 100) : 'Sin descripción'}
                                        {conv.descripcion && conv.descripcion.length > 100 && '...'}
                                    </p>
                                    
                                    {conv.fechaLimite && (
                                        <div className={Style.fecha}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="2"/>
                                            </svg>
                                            Límite: {conv.fechaLimite}
                                        </div>
                                    )}
                                    
                                    {userRole === 'profesor' && (
                                        <div className={Style.stats}>
                                            <span>👁️ {conv.views || 0} vistas</span>
                                            <span>� {conv.postulantes?.length || 0} postulantes</span>
                                            <span>�📅 {formatDate(conv.createdAt)}</span>
                                        </div>
                                    )}
                                    
                                    {userRole === 'student' && conv.profesorNombre && (
                                        <div className={Style.profesor}>
                                            Por: {conv.profesorNombre}
                                        </div>
                                    )}

                                    {userRole === 'student' && yaPostulado(conv) && (
                                        <div style={{
                                            background: getEstadoPostulacion(conv) === 'pendiente' ? '#fff3cd' : 
                                                      getEstadoPostulacion(conv) === 'aceptado' ? '#d4edda' : '#f8d7da',
                                            color: getEstadoPostulacion(conv) === 'pendiente' ? '#856404' : 
                                                   getEstadoPostulacion(conv) === 'aceptado' ? '#155724' : '#721c24',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            marginTop: '10px',
                                            textAlign: 'center'
                                        }}>
                                            {getEstadoPostulacion(conv) === 'pendiente' && '⏳ Postulación en revisión'}
                                            {getEstadoPostulacion(conv) === 'aceptado' && '✅ ¡Fuiste aceptado!'}
                                            {getEstadoPostulacion(conv) === 'rechazado' && '❌ Postulación rechazada'}
                                        </div>
                                    )}
                                    
                                    <div className={Style.cardActions}>
                                        {userRole === 'student' && !yaPostulado(conv) && conv.estado === 'abierta' && (
                                            <button 
                                                className={Style.primaryBtn}
                                                onClick={() => handlePostularse(conv)}
                                                style={{ flex: 1, justifyContent: 'center' }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                                Postularme
                                            </button>
                                        )}
                                        
                                        {userRole === 'profesor' && (
                                            <>
                                                <button 
                                                    className={Style.primaryBtn}
                                                    onClick={() => handleGestionarPostulantes(conv)}
                                                    style={{
                                                        background: conv.postulantes?.length > 0 ? '#667eea' : '#ccc',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2"/>
                                                    </svg>
                                                    Postulantes
                                                    {conv.postulantes?.length > 0 && (
                                                        <span style={{
                                                            position: 'absolute',
                                                            top: '-8px',
                                                            right: '-8px',
                                                            background: '#ff4757',
                                                            color: 'white',
                                                            borderRadius: '50%',
                                                            width: '22px',
                                                            height: '22px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {conv.postulantes.length}
                                                        </span>
                                                    )}
                                                </button>
                                                <button 
                                                    className={Style.primaryBtn}
                                                    onClick={() => handleCrearCurso(conv)}
                                                    style={{
                                                        background: '#10b981',
                                                        minWidth: '120px'
                                                    }}
                                                    title="Crear curso con estudiantes aceptados"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                        <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                    Crear Curso
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal para crear convocatoria */}
            {showModal && (
                <div className={Style.modal}>
                    <div className={Style.modalContent}>
                        <div className={Style.modalHeader}>
                            <h2>Nueva Convocatoria</h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className={Style.modalForm}>
                            <div className={Style.formGroup}>
                                <label>Título *</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    placeholder="Título de la convocatoria"
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Descripción *</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    placeholder="Describe la convocatoria..."
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className={Style.formRow}>
                                <div className={Style.formGroup}>
                                    <label>Tipo</label>
                                    <select
                                        name="tipo"
                                        value={formData.tipo}
                                        onChange={handleInputChange}
                                    >
                                        <option value="general">General</option>
                                        <option value="evento">Evento</option>
                                        <option value="tarea">Tarea</option>
                                    </select>
                                </div>

                                <div className={Style.formGroup}>
                                    <label>Prioridad</label>
                                    <select
                                        name="prioridad"
                                        value={formData.prioridad}
                                        onChange={handleInputChange}
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="media">Media</option>
                                        <option value="alta">Alta</option>
                                    </select>
                                </div>
                            </div>

                            <div className={Style.formRow}>
                                <div className={Style.formGroup}>
                                    <label>Cupos Máximos</label>
                                    <input
                                        type="number"
                                        name="cuposMaximos"
                                        value={formData.cuposMaximos}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 30"
                                        min="1"
                                    />
                                </div>

                                <div className={Style.formGroup}>
                                    <label>Duración</label>
                                    <input
                                        type="text"
                                        name="duracion"
                                        value={formData.duracion}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 8 semanas"
                                    />
                                </div>
                            </div>

                            <div className={Style.formRow}>
                                <div className={Style.formGroup}>
                                    <label>Fecha de Inicio</label>
                                    <input
                                        type="date"
                                        name="fechaInicio"
                                        value={formData.fechaInicio}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className={Style.formGroup}>
                                    <label>Fecha límite postulación</label>
                                    <input
                                        type="date"
                                        name="fechaLimite"
                                        value={formData.fechaLimite}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className={Style.modalActions}>
                                <button 
                                    type="button" 
                                    className={Style.cancelBtn}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className={Style.submitBtn}
                                >
                                    Crear Convocatoria
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para ver detalles */}
            {selectedConvocatoria && (
                <div className={Style.modal} onClick={() => setSelectedConvocatoria(null)}>
                    <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={Style.modalHeader}>
                            <h2>{selectedConvocatoria.titulo}</h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => setSelectedConvocatoria(null)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className={Style.modalBody}>
                            <div className={Style.detailBadges}>
                                <span className={Style.badge}>{selectedConvocatoria.tipo}</span>
                                <span 
                                    className={Style.badge}
                                    style={{ background: getPrioridadColor(selectedConvocatoria.prioridad) }}
                                >
                                    {selectedConvocatoria.prioridad}
                                </span>
                            </div>
                            
                            <div className={Style.detailSection}>
                                <h3>Descripción</h3>
                                <p>{selectedConvocatoria.descripcion}</p>
                            </div>
                            
                            {selectedConvocatoria.fechaLimite && (
                                <div className={Style.detailSection}>
                                    <h3>Fecha límite</h3>
                                    <p>{selectedConvocatoria.fechaLimite}</p>
                                </div>
                            )}
                            
                            {selectedConvocatoria.profesorNombre && (
                                <div className={Style.detailSection}>
                                    <h3>Publicado por</h3>
                                    <p>{selectedConvocatoria.profesorNombre}</p>
                                </div>
                            )}
                            
                            <div className={Style.detailSection}>
                                <h3>Fecha de publicación</h3>
                                <p>{formatDate(selectedConvocatoria.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de postulación */}
            {showPostulacionModal && selectedConvocatoria && (
                <ModalPostulacion
                    convocatoria={selectedConvocatoria}
                    userId={userId}
                    userName={userName}
                    onClose={() => {
                        setShowPostulacionModal(false);
                        setSelectedConvocatoria(null);
                    }}
                    onSuccess={() => loadConvocatorias(userRole, userId)}
                />
            )}

            {/* Modal de gestión de postulantes */}
            {showPostulantesModal && selectedConvocatoria && (
                <ModalPostulantes
                    convocatoria={selectedConvocatoria}
                    onClose={() => {
                        setShowPostulantesModal(false);
                        setSelectedConvocatoria(null);
                    }}
                    onUpdate={() => loadConvocatorias(userRole, userId)}
                />
            )}
        </div>
    );
}

export default Convocatorias;

