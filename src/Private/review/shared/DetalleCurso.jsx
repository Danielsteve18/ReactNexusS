import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Style from "./shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { getCursoById, updateCurso } from "../../../firebase/services/cursos";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { profesorMenuItems, studentMenuItems } from '../../../utils/menuItems';
import ModalEntregarTarea from './ModalEntregarTarea';
import ModalRevisarEntregas from './ModalRevisarEntregas';

function DetalleCurso() {
    const { cursoId } = useParams();
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [activeTab, setActiveTab] = useState('contenido');
    const [showModuloModal, setShowModuloModal] = useState(false);
    const [showLeccionModal, setShowLeccionModal] = useState(false);
    const [showTareaModal, setShowTareaModal] = useState(false);
    const [showEntregarModal, setShowEntregarModal] = useState(false);
    const [showRevisarModal, setShowRevisarModal] = useState(false);
    const [selectedModulo, setSelectedModulo] = useState(null);
    const [selectedTarea, setSelectedTarea] = useState(null);
    const [moduloForm, setModuloForm] = useState({
        titulo: '',
        descripcion: '',
        orden: 1
    });
    const [leccionForm, setLeccionForm] = useState({
        titulo: '',
        contenido: '',
        tipo: 'texto',
        videoUrl: '',
        recursos: '',
        orden: 1
    });
    const [tareaForm, setTareaForm] = useState({
        titulo: '',
        descripcion: '',
        fechaEntrega: '',
        puntaje: 100
    });

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('userId');
        setUserRole(role);
        setUserId(id);
        loadCurso();
    }, [cursoId]);

    const loadCurso = async () => {
        setLoading(true);
        try {
            const result = await getCursoById(cursoId);
            if (result.success) {
                setCurso(result.data);
            } else {
                alert('Error al cargar el curso');
                navigate(-1);
            }
        } catch (error) {
            console.error("Error cargando curso:", error);
        }
        setLoading(false);
    };

    const handleAgregarModulo = async (e) => {
        e.preventDefault();
        
        const modulos = curso.modulos || [];
        const nuevoModulo = {
            id: Date.now().toString(),
            ...moduloForm,
            lecciones: [],
            createdAt: new Date()
        };
        
        const result = await updateCurso(cursoId, {
            modulos: [...modulos, nuevoModulo]
        });

        if (result.success) {
            alert('Módulo agregado exitosamente');
            setShowModuloModal(false);
            setModuloForm({ titulo: '', descripcion: '', orden: modulos.length + 1 });
            loadCurso();
        } else {
            alert('Error al agregar módulo: ' + result.error);
        }
    };

    const handleAgregarLeccion = async (e) => {
        e.preventDefault();
        
        if (!selectedModulo) return;
        
        const modulos = [...(curso.modulos || [])];
        const moduloIndex = modulos.findIndex(m => m.id === selectedModulo.id);
        
        if (moduloIndex === -1) return;
        
        const nuevaLeccion = {
            id: Date.now().toString(),
            ...leccionForm,
            completada: false,
            createdAt: new Date()
        };
        
        modulos[moduloIndex].lecciones = [...(modulos[moduloIndex].lecciones || []), nuevaLeccion];
        
        const result = await updateCurso(cursoId, { modulos });

        if (result.success) {
            alert('Lección agregada exitosamente');
            setShowLeccionModal(false);
            setLeccionForm({ titulo: '', contenido: '', tipo: 'texto', videoUrl: '', recursos: '', orden: 1 });
            setSelectedModulo(null);
            loadCurso();
        } else {
            alert('Error al agregar lección: ' + result.error);
        }
    };

    const handleAgregarTarea = async (e) => {
        e.preventDefault();
        
        const tareas = curso.tareas || [];
        const nuevaTarea = {
            id: Date.now().toString(),
            ...tareaForm,
            entregas: [],
            createdAt: new Date()
        };
        
        const result = await updateCurso(cursoId, {
            tareas: [...tareas, nuevaTarea]
        });

        if (result.success) {
            alert('Tarea creada exitosamente');
            setShowTareaModal(false);
            setTareaForm({ titulo: '', descripcion: '', fechaEntrega: '', puntaje: 100 });
            loadCurso();
        } else {
            alert('Error al crear tarea: ' + result.error);
        }
    };

    const marcarLeccionCompleta = async (moduloId, leccionId) => {
        if (userRole !== 'student') return;
        
        const modulos = [...(curso.modulos || [])];
        const moduloIndex = modulos.findIndex(m => m.id === moduloId);
        
        if (moduloIndex === -1) return;
        
        const leccionIndex = modulos[moduloIndex].lecciones.findIndex(l => l.id === leccionId);
        
        if (leccionIndex === -1) return;
        
        const progreso = curso.progreso || {};
        if (!progreso[userId]) {
            progreso[userId] = { leccionesCompletadas: [] };
        }
        
        const leccionKey = `${moduloId}-${leccionId}`;
        if (!progreso[userId].leccionesCompletadas.includes(leccionKey)) {
            progreso[userId].leccionesCompletadas.push(leccionKey);
        }
        
        const result = await updateCurso(cursoId, { progreso });

        if (result.success) {
            loadCurso();
        }
    };

    const isLeccionCompleta = (moduloId, leccionId) => {
        if (!curso.progreso || !curso.progreso[userId]) return false;
        const leccionKey = `${moduloId}-${leccionId}`;
        return curso.progreso[userId].leccionesCompletadas?.includes(leccionKey) || false;
    };

    const calcularProgreso = () => {
        if (!curso.modulos || curso.modulos.length === 0) return 0;
        
        const totalLecciones = curso.modulos.reduce((acc, mod) => 
            acc + (mod.lecciones?.length || 0), 0);
        
        if (totalLecciones === 0) return 0;
        
        const leccionesCompletas = curso.progreso?.[userId]?.leccionesCompletadas?.length || 0;
        
        return Math.round((leccionesCompletas / totalLecciones) * 100);
    };

    const handleEntregarTarea = async (tareaData) => {
        const tareas = [...(curso.tareas || [])];
        const tareaIndex = tareas.findIndex(t => t.id === selectedTarea.id);
        
        if (tareaIndex === -1) return;
        
        const nuevaEntrega = {
            estudianteId: userId,
            driveLink: tareaData.driveLink,
            comentarios: tareaData.comentarios,
            fechaEntrega: new Date(),
            estado: 'pendiente'
        };
        
        if (!tareas[tareaIndex].entregas) {
            tareas[tareaIndex].entregas = [];
        }
        
        // Verificar si ya entregó
        const yaEntrego = tareas[tareaIndex].entregas.findIndex(e => e.estudianteId === userId);
        
        if (yaEntrego !== -1) {
            // Actualizar entrega existente
            tareas[tareaIndex].entregas[yaEntrego] = nuevaEntrega;
        } else {
            // Nueva entrega
            tareas[tareaIndex].entregas.push(nuevaEntrega);
        }
        
        const result = await updateCurso(cursoId, { tareas });
        
        if (result.success) {
            alert('¡Tarea entregada exitosamente!');
            setShowEntregarModal(false);
            setSelectedTarea(null);
            loadCurso();
        } else {
            alert('Error al entregar tarea: ' + result.error);
        }
    };

    const handleCalificarTarea = async (estudianteId, calificacionData) => {
        const tareas = [...(curso.tareas || [])];
        const tareaIndex = tareas.findIndex(t => t.id === selectedTarea.id);
        
        if (tareaIndex === -1) return;
        
        const entregaIndex = tareas[tareaIndex].entregas.findIndex(
            e => e.estudianteId === estudianteId
        );
        
        if (entregaIndex === -1) return;
        
        tareas[tareaIndex].entregas[entregaIndex] = {
            ...tareas[tareaIndex].entregas[entregaIndex],
            puntaje: calificacionData.puntaje,
            comentariosProfesor: calificacionData.comentarios,
            fechaCalificacion: calificacionData.fechaCalificacion,
            estado: 'calificada'
        };
        
        const result = await updateCurso(cursoId, { tareas });
        
        if (result.success) {
            alert('Calificación guardada exitosamente');
            loadCurso();
        } else {
            alert('Error al guardar calificación: ' + result.error);
        }
    };

    const yaEntregoTarea = (tarea) => {
        if (!tarea.entregas) return false;
        return tarea.entregas.some(e => e.estudianteId === userId);
    };

    const getEstadoEntrega = (tarea) => {
        if (!tarea.entregas) return null;
        const entrega = tarea.entregas.find(e => e.estudianteId === userId);
        return entrega ? entrega.estado : null;
    };

    const getPuntajeEntrega = (tarea) => {
        if (!tarea.entregas) return null;
        const entrega = tarea.entregas.find(e => e.estudianteId === userId);
        return entrega?.puntaje;
    };

    if (loading) {
        return (
            <div className={Style.container}>
                <Barra_Left items={userRole === 'profesor' ? profesorMenuItems : studentMenuItems} />
                <div className={Style.content}>
                    <div className={Style.loadingState}>
                        <div className={Style.spinner}></div>
                        <p>Cargando curso...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!curso) {
        return (
            <div className={Style.container}>
                <Barra_Left items={userRole === 'profesor' ? profesorMenuItems : studentMenuItems} />
                <div className={Style.content}>
                    <p>Curso no encontrado</p>
                </div>
            </div>
        );
    }

    const menuItems = userRole === 'profesor' ? profesorMenuItems : studentMenuItems;

    return (
        <div className={Style.container}>
            <Barra_Left items={menuItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <button 
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            marginBottom: '10px'
                        }}
                    >
                        ← Volver
                    </button>
                    <h1>📚 {curso.titulo}</h1>
                    <p>{curso.descripcion}</p>
                    
                    {userRole === 'student' && (
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            marginTop: '20px'
                        }}>
                            <div style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                                Tu progreso
                            </div>
                            <div style={{ 
                                background: 'rgba(255,255,255,0.3)',
                                borderRadius: '8px',
                                height: '24px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    background: 'white',
                                    height: '100%',
                                    width: `${calcularProgreso()}%`,
                                    transition: 'width 0.3s ease',
                                    borderRadius: '8px'
                                }}></div>
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {calcularProgreso()}% completado
                            </div>
                        </div>
                    )}
                </div>

                <div className={Style.tabs}>
                    <button 
                        className={activeTab === 'contenido' ? Style.activeTab : Style.tab}
                        onClick={() => setActiveTab('contenido')}
                    >
                        📖 Contenido
                    </button>
                    <button 
                        className={activeTab === 'clases' ? Style.activeTab : Style.tab}
                        onClick={() => setActiveTab('clases')}
                    >
                        🎥 Clases
                    </button>
                    <button 
                        className={activeTab === 'tareas' ? Style.activeTab : Style.tab}
                        onClick={() => setActiveTab('tareas')}
                    >
                        📝 Tareas
                    </button>
                    <button 
                        className={activeTab === 'estudiantes' ? Style.activeTab : Style.tab}
                        onClick={() => setActiveTab('estudiantes')}
                    >
                        👥 Estudiantes
                    </button>
                </div>

                {/* TAB CONTENIDO */}
                {activeTab === 'contenido' && (
                    <div className={Style.mainSection}>
                        {userRole === 'profesor' && (
                            <button 
                                className={Style.primaryBtn}
                                onClick={() => setShowModuloModal(true)}
                                style={{ marginBottom: '20px' }}
                            >
                                + Agregar Módulo
                            </button>
                        )}

                        {(!curso.modulos || curso.modulos.length === 0) ? (
                            <div className={Style.emptyState}>
                                <p>No hay módulos en este curso</p>
                                {userRole === 'profesor' && (
                                    <p className={Style.subText}>Crea el primer módulo para comenzar</p>
                                )}
                            </div>
                        ) : (
                            <div className={Style.modulosList}>
                                {curso.modulos
                                    .sort((a, b) => a.orden - b.orden)
                                    .map((modulo, index) => (
                                        <div key={modulo.id} className={Style.moduloCard}>
                                            <div className={Style.moduloHeader}>
                                                <h3>
                                                    Módulo {index + 1}: {modulo.titulo}
                                                </h3>
                                                {userRole === 'profesor' && (
                                                    <button
                                                        className={Style.primaryBtn}
                                                        onClick={() => {
                                                            setSelectedModulo(modulo);
                                                            setShowLeccionModal(true);
                                                        }}
                                                        style={{ fontSize: '0.9rem' }}
                                                    >
                                                        + Agregar Lección
                                                    </button>
                                                )}
                                            </div>
                                            <p style={{ color: '#666', marginBottom: '15px' }}>
                                                {modulo.descripcion}
                                            </p>

                                            {(!modulo.lecciones || modulo.lecciones.length === 0) ? (
                                                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                                                    No hay lecciones en este módulo
                                                </p>
                                            ) : (
                                                <div className={Style.leccionesList}>
                                                    {modulo.lecciones
                                                        .sort((a, b) => a.orden - b.orden)
                                                        .map((leccion, lIndex) => (
                                                            <div 
                                                                key={leccion.id} 
                                                                className={Style.leccionItem}
                                                                style={{
                                                                    background: isLeccionCompleta(modulo.id, leccion.id) 
                                                                        ? '#d4edda' : '#f8f9fa',
                                                                    borderLeft: isLeccionCompleta(modulo.id, leccion.id)
                                                                        ? '4px solid #28a745' : '4px solid #ddd'
                                                                }}
                                                            >
                                                                <div style={{ flex: 1 }}>
                                                                    <h4>
                                                                        {lIndex + 1}. {leccion.titulo}
                                                                        {leccion.tipo === 'video' && ' 🎥'}
                                                                        {isLeccionCompleta(modulo.id, leccion.id) && ' ✅'}
                                                                    </h4>
                                                                    <p style={{ 
                                                                        fontSize: '0.9rem', 
                                                                        color: '#666',
                                                                        marginTop: '5px'
                                                                    }}>
                                                                        {leccion.contenido?.substring(0, 150)}
                                                                        {leccion.contenido?.length > 150 && '...'}
                                                                    </p>
                                                                    {leccion.videoUrl && (
                                                                        <a 
                                                                            href={leccion.videoUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            style={{ 
                                                                                color: '#667eea',
                                                                                fontSize: '0.85rem',
                                                                                marginTop: '5px',
                                                                                display: 'inline-block'
                                                                            }}
                                                                        >
                                                                            Ver video →
                                                                        </a>
                                                                    )}
                                                                </div>
                                                                {userRole === 'student' && !isLeccionCompleta(modulo.id, leccion.id) && (
                                                                    <button
                                                                        className={Style.primaryBtn}
                                                                        onClick={() => marcarLeccionCompleta(modulo.id, leccion.id)}
                                                                        style={{ fontSize: '0.85rem' }}
                                                                    >
                                                                        Marcar completa
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB CLASES */}
                {activeTab === 'clases' && (
                    <div className={Style.mainSection}>
                        {curso.aulaVirtual ? (
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '15px',
                                padding: '40px',
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                                    {curso.aulaVirtual.plataforma === 'meet' && '📹'}
                                    {curso.aulaVirtual.plataforma === 'zoom' && '💻'}
                                    {curso.aulaVirtual.plataforma === 'teams' && '👥'}
                                    {curso.aulaVirtual.plataforma === 'classroom' && '📚'}
                                    {curso.aulaVirtual.plataforma === 'otro' && '🔗'}
                                </div>
                                
                                <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>
                                    {curso.aulaVirtual.titulo || 'Clase Virtual'}
                                </h2>

                                {curso.aulaVirtual.descripcion && (
                                    <p style={{ 
                                        fontSize: '1.1rem', 
                                        marginBottom: '25px',
                                        opacity: 0.9 
                                    }}>
                                        {curso.aulaVirtual.descripcion}
                                    </p>
                                )}

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '30px',
                                    marginBottom: '30px',
                                    flexWrap: 'wrap'
                                }}>
                                    {curso.aulaVirtual.horaClase && (
                                        <div style={{
                                            background: 'rgba(255,255,255,0.2)',
                                            padding: '15px 25px',
                                            borderRadius: '10px'
                                        }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🕐</div>
                                            <strong>{curso.aulaVirtual.horaClase}</strong>
                                        </div>
                                    )}
                                    
                                    {curso.aulaVirtual.diasClase && (
                                        <div style={{
                                            background: 'rgba(255,255,255,0.2)',
                                            padding: '15px 25px',
                                            borderRadius: '10px'
                                        }}>
                                            <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>📅</div>
                                            <strong>{curso.aulaVirtual.diasClase}</strong>
                                        </div>
                                    )}
                                </div>

                                <a 
                                    href={curso.aulaVirtual.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '18px 40px',
                                        background: 'white',
                                        color: '#667eea',
                                        textDecoration: 'none',
                                        borderRadius: '50px',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Unirse a la Clase
                                </a>

                                <div style={{
                                    marginTop: '30px',
                                    padding: '20px',
                                    background: 'rgba(255,255,255,0.15)',
                                    borderRadius: '10px',
                                    fontSize: '0.95rem'
                                }}>
                                    <p style={{ margin: 0 }}>
                                        💡 <strong>Tip:</strong> Asegúrate de tener una buena conexión a internet
                                        {curso.aulaVirtual.plataforma === 'meet' && ' y que tu navegador permita el acceso a cámara y micrófono'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={Style.emptyState}>
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="#ccc" strokeWidth="2"/>
                                </svg>
                                <p>No hay link de clase configurado</p>
                                {userRole === 'profesor' ? (
                                    <p className={Style.subText}>
                                        Ve a "Aula Virtual" en el menú para configurar el link de tu clase
                                    </p>
                                ) : (
                                    <p className={Style.subText}>
                                        El profesor aún no ha configurado el link de la clase virtual
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB TAREAS */}
                {activeTab === 'tareas' && (
                    <div className={Style.mainSection}>
                        {userRole === 'profesor' && (
                            <button 
                                className={Style.primaryBtn}
                                onClick={() => setShowTareaModal(true)}
                                style={{ marginBottom: '20px' }}
                            >
                                + Crear Tarea
                            </button>
                        )}

                        {(!curso.tareas || curso.tareas.length === 0) ? (
                            <div className={Style.emptyState}>
                                <p>No hay tareas asignadas</p>
                            </div>
                        ) : (
                            <div className={Style.coursesGrid}>
                                {curso.tareas.map((tarea) => (
                                    <div key={tarea.id} className={Style.convocatoriaCard}>
                                        <h3>{tarea.titulo}</h3>
                                        <p>{tarea.descripcion}</p>
                                        <div className={Style.fecha}>
                                            📅 Fecha límite: {tarea.fechaEntrega}
                                        </div>
                                        <div style={{ marginTop: '10px', color: '#667eea', fontWeight: 'bold' }}>
                                            Puntaje: {tarea.puntaje} pts
                                        </div>
                                        
                                        {userRole === 'student' && (
                                            <>
                                                {yaEntregoTarea(tarea) ? (
                                                    <div style={{ marginTop: '15px' }}>
                                                        {getEstadoEntrega(tarea) === 'calificada' ? (
                                                            <div style={{
                                                                background: '#d4edda',
                                                                color: '#155724',
                                                                padding: '12px',
                                                                borderRadius: '8px',
                                                                textAlign: 'center',
                                                                fontWeight: 'bold'
                                                            }}>
                                                                ✓ Calificada: {getPuntajeEntrega(tarea)}/{tarea.puntaje} pts
                                                            </div>
                                                        ) : (
                                                            <div style={{
                                                                background: '#fff3cd',
                                                                color: '#856404',
                                                                padding: '12px',
                                                                borderRadius: '8px',
                                                                textAlign: 'center',
                                                                fontWeight: 'bold'
                                                            }}>
                                                                ⏳ Entregada - En revisión
                                                            </div>
                                                        )}
                                                        <button 
                                                            className={Style.viewBtn}
                                                            style={{ marginTop: '10px', width: '100%' }}
                                                            onClick={() => {
                                                                setSelectedTarea(tarea);
                                                                setShowEntregarModal(true);
                                                            }}
                                                        >
                                                            Ver/Actualizar entrega
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        className={Style.primaryBtn}
                                                        style={{ marginTop: '15px', width: '100%' }}
                                                        onClick={() => {
                                                            setSelectedTarea(tarea);
                                                            setShowEntregarModal(true);
                                                        }}
                                                    >
                                                        📤 Entregar tarea
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        
                                        {userRole === 'profesor' && (
                                            <>
                                                <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                                                    {tarea.entregas?.length || 0} entrega(s)
                                                    {tarea.entregas?.filter(e => e.estado === 'calificada').length > 0 && (
                                                        <span style={{ marginLeft: '10px', color: '#28a745', fontWeight: 'bold' }}>
                                                            ({tarea.entregas.filter(e => e.estado === 'calificada').length} calificada(s))
                                                        </span>
                                                    )}
                                                </div>
                                                <button 
                                                    className={Style.primaryBtn}
                                                    style={{ 
                                                        marginTop: '15px', 
                                                        width: '100%',
                                                        background: tarea.entregas?.length > 0 ? '#667eea' : '#ccc'
                                                    }}
                                                    onClick={() => {
                                                        setSelectedTarea(tarea);
                                                        setShowRevisarModal(true);
                                                    }}
                                                    disabled={!tarea.entregas || tarea.entregas.length === 0}
                                                >
                                                    📋 Revisar entregas
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB ESTUDIANTES */}
                {activeTab === 'estudiantes' && (
                    <div className={Style.mainSection}>
                        <h3>Estudiantes inscritos: {curso.estudiantes?.length || 0}</h3>
                        {(!curso.estudiantes || curso.estudiantes.length === 0) ? (
                            <div className={Style.emptyState}>
                                <p>No hay estudiantes inscritos</p>
                            </div>
                        ) : (
                            <div className={Style.coursesGrid}>
                                {curso.estudiantes.map((estudiante) => (
                                    <div key={estudiante.id} className={Style.convocatoriaCard}>
                                        <h3>{estudiante.nombre || 'Estudiante'}</h3>
                                        <p>ID: {estudiante.id}</p>
                                        {userRole === 'profesor' && curso.progreso && curso.progreso[estudiante.id] && (
                                            <div style={{ marginTop: '10px' }}>
                                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                                    Progreso del curso
                                                </div>
                                                <div style={{
                                                    background: '#e0e0e0',
                                                    borderRadius: '8px',
                                                    height: '20px',
                                                    marginTop: '5px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        background: '#667eea',
                                                        height: '100%',
                                                        width: `${(curso.progreso[estudiante.id].leccionesCompletadas?.length || 0) / 
                                                            curso.modulos.reduce((acc, m) => acc + (m.lecciones?.length || 0), 0) * 100}%`
                                                    }}></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL AGREGAR MÓDULO */}
            {showModuloModal && (
                <div className={Style.modal}>
                    <div className={Style.modalContent}>
                        <div className={Style.modalHeader}>
                            <h2>Agregar Módulo</h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => setShowModuloModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleAgregarModulo} className={Style.modalForm}>
                            <div className={Style.formGroup}>
                                <label>Título del módulo *</label>
                                <input
                                    type="text"
                                    value={moduloForm.titulo}
                                    onChange={(e) => setModuloForm({...moduloForm, titulo: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Descripción</label>
                                <textarea
                                    value={moduloForm.descripcion}
                                    onChange={(e) => setModuloForm({...moduloForm, descripcion: e.target.value})}
                                    rows="3"
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Orden</label>
                                <input
                                    type="number"
                                    value={moduloForm.orden}
                                    onChange={(e) => setModuloForm({...moduloForm, orden: parseInt(e.target.value)})}
                                    min="1"
                                />
                            </div>

                            <div className={Style.modalActions}>
                                <button 
                                    type="button" 
                                    className={Style.cancelBtn}
                                    onClick={() => setShowModuloModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={Style.submitBtn}>
                                    Agregar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL AGREGAR LECCIÓN */}
            {showLeccionModal && (
                <div className={Style.modal}>
                    <div className={Style.modalContent}>
                        <div className={Style.modalHeader}>
                            <h2>Agregar Lección</h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => {
                                    setShowLeccionModal(false);
                                    setSelectedModulo(null);
                                }}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleAgregarLeccion} className={Style.modalForm}>
                            <div className={Style.formGroup}>
                                <label>Título de la lección *</label>
                                <input
                                    type="text"
                                    value={leccionForm.titulo}
                                    onChange={(e) => setLeccionForm({...leccionForm, titulo: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Tipo</label>
                                <select
                                    value={leccionForm.tipo}
                                    onChange={(e) => setLeccionForm({...leccionForm, tipo: e.target.value})}
                                >
                                    <option value="texto">Texto</option>
                                    <option value="video">Video</option>
                                    <option value="mixto">Mixto</option>
                                </select>
                            </div>

                            <div className={Style.formGroup}>
                                <label>Contenido *</label>
                                <textarea
                                    value={leccionForm.contenido}
                                    onChange={(e) => setLeccionForm({...leccionForm, contenido: e.target.value})}
                                    rows="5"
                                    required
                                />
                            </div>

                            {(leccionForm.tipo === 'video' || leccionForm.tipo === 'mixto') && (
                                <div className={Style.formGroup}>
                                    <label>URL del video</label>
                                    <input
                                        type="url"
                                        value={leccionForm.videoUrl}
                                        onChange={(e) => setLeccionForm({...leccionForm, videoUrl: e.target.value})}
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                            )}

                            <div className={Style.formGroup}>
                                <label>Recursos adicionales (opcional)</label>
                                <input
                                    type="text"
                                    value={leccionForm.recursos}
                                    onChange={(e) => setLeccionForm({...leccionForm, recursos: e.target.value})}
                                    placeholder="Enlaces, archivos, etc."
                                />
                            </div>

                            <div className={Style.modalActions}>
                                <button 
                                    type="button" 
                                    className={Style.cancelBtn}
                                    onClick={() => {
                                        setShowLeccionModal(false);
                                        setSelectedModulo(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={Style.submitBtn}>
                                    Agregar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL CREAR TAREA */}
            {showTareaModal && (
                <div className={Style.modal}>
                    <div className={Style.modalContent}>
                        <div className={Style.modalHeader}>
                            <h2>Crear Tarea</h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => setShowTareaModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleAgregarTarea} className={Style.modalForm}>
                            <div className={Style.formGroup}>
                                <label>Título de la tarea *</label>
                                <input
                                    type="text"
                                    value={tareaForm.titulo}
                                    onChange={(e) => setTareaForm({...tareaForm, titulo: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Descripción *</label>
                                <textarea
                                    value={tareaForm.descripcion}
                                    onChange={(e) => setTareaForm({...tareaForm, descripcion: e.target.value})}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className={Style.formRow}>
                                <div className={Style.formGroup}>
                                    <label>Fecha de entrega</label>
                                    <input
                                        type="date"
                                        value={tareaForm.fechaEntrega}
                                        onChange={(e) => setTareaForm({...tareaForm, fechaEntrega: e.target.value})}
                                    />
                                </div>

                                <div className={Style.formGroup}>
                                    <label>Puntaje</label>
                                    <input
                                        type="number"
                                        value={tareaForm.puntaje}
                                        onChange={(e) => setTareaForm({...tareaForm, puntaje: parseInt(e.target.value)})}
                                        min="1"
                                    />
                                </div>
                            </div>

                            <div className={Style.modalActions}>
                                <button 
                                    type="button" 
                                    className={Style.cancelBtn}
                                    onClick={() => setShowTareaModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={Style.submitBtn}>
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL ENTREGAR TAREA (ESTUDIANTE) */}
            {showEntregarModal && selectedTarea && (
                <ModalEntregarTarea
                    tarea={selectedTarea}
                    cursoId={cursoId}
                    onClose={() => {
                        setShowEntregarModal(false);
                        setSelectedTarea(null);
                    }}
                    onSubmit={handleEntregarTarea}
                />
            )}

            {/* MODAL REVISAR ENTREGAS (PROFESOR) */}
            {showRevisarModal && selectedTarea && (
                <ModalRevisarEntregas
                    tarea={selectedTarea}
                    curso={curso}
                    onClose={() => {
                        setShowRevisarModal(false);
                        setSelectedTarea(null);
                    }}
                    onCalificar={handleCalificarTarea}
                />
            )}
        </div>
    );
}

export default DetalleCurso;
