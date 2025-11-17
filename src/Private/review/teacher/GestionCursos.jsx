import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../shared/shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { 
    createCurso, 
    getCursosByProfesor,
    updateCurso,
    deleteCurso
} from "../../../firebase/services/cursos";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { profesorMenuItems } from '../../../utils/menuItems';

function GestionCursos() {
    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        objetivos: '',
        categoria: 'programacion',
        duracion: '',
        imagen: ''
    });

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
        fetchUserData(id);
        loadCursos(id);
    }, []);

    const fetchUserData = async (id) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', id));
            if (userDoc.exists()) {
                setUserName(userDoc.data().name || 'Profesor');
            }
        } catch (error) {
            console.error("Error obteniendo datos del usuario:", error);
        }
    };

    const loadCursos = async (id) => {
        setLoading(true);
        try {
            const result = await getCursosByProfesor(id);
            if (result.success) {
                setCursos(result.data);
            }
        } catch (error) {
            console.error("Error cargando cursos:", error);
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

        const cursoData = {
            ...formData,
            profesorId: userId,
            profesorNombre: userName
        };

        const result = await createCurso(cursoData);
        
        if (result.success) {
            alert('Curso creado exitosamente');
            setShowModal(false);
            setFormData({
                titulo: '',
                descripcion: '',
                objetivos: '',
                categoria: 'programacion',
                duracion: '',
                imagen: ''
            });
            loadCursos(userId);
        } else {
            alert('Error al crear el curso: ' + result.error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este curso?')) {
            const result = await deleteCurso(id);
            if (result.success) {
                alert('Curso eliminado');
                loadCursos(userId);
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const getCategoriaColor = (categoria) => {
        const colores = {
            'programacion': '#667eea',
            'diseño': '#f093fb',
            'negocios': '#4facfe',
            'idiomas': '#43e97b',
            'ciencias': '#fa709a',
            'default': '#764ba2'
        };
        return colores[categoria?.toLowerCase()] || colores.default;
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

    return (
        <div className={Style.container}>
            <Barra_Left items={profesorMenuItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>📚 Gestión de Cursos</h1>
                    <p>Administra tus cursos y contenido educativo</p>
                </div>

                <div className={Style.mainSection}>
                    <button 
                        className={Style.primaryBtn}
                        onClick={() => setShowModal(true)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        Crear Nuevo Curso
                    </button>

                    {loading ? (
                        <div className={Style.loadingState}>
                            <div className={Style.spinner}></div>
                            <p>Cargando cursos...</p>
                        </div>
                    ) : cursos.length === 0 ? (
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>No has creado ningún curso</p>
                            <p className={Style.subText}>Crea tu primer curso para comenzar</p>
                        </div>
                    ) : (
                        <div className={Style.coursesGrid}>
                            {cursos.map((curso) => (
                                <div 
                                    key={curso.id} 
                                    className={Style.cursoCard}
                                    style={{ 
                                        borderTop: `4px solid ${getCategoriaColor(curso.categoria)}` 
                                    }}
                                >
                                    {curso.imagen && (
                                        <div 
                                            className={Style.cursoImagen}
                                            style={{ 
                                                backgroundImage: `url(${curso.imagen})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        />
                                    )}
                                    
                                    <div className={Style.cursoContent}>
                                        <div className={Style.cursoBadges}>
                                            <span 
                                                className={Style.badge}
                                                style={{ 
                                                    background: getCategoriaColor(curso.categoria) 
                                                }}
                                            >
                                                {curso.categoria}
                                            </span>
                                        </div>
                                        
                                        <h3>{curso.titulo}</h3>
                                        <p className={Style.descripcion}>
                                            {curso.descripcion?.substring(0, 120)}
                                            {curso.descripcion?.length > 120 && '...'}
                                        </p>
                                        
                                        <div className={Style.stats}>
                                            <span>👥 {curso.estudiantes?.length || 0} estudiantes</span>
                                            <span>📅 {formatDate(curso.createdAt)}</span>
                                        </div>
                                        
                                        {curso.duracion && (
                                            <div className={Style.duracion}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                                Duración: {curso.duracion}
                                            </div>
                                        )}
                                        
                                        <div className={Style.cardActions}>
                                            <button 
                                                className={Style.viewBtn}
                                                onClick={() => navigate(`/detalle-curso/${curso.id}`)}
                                            >
                                                Gestionar
                                            </button>
                                            <button 
                                                className={Style.deleteBtn}
                                                onClick={() => handleDelete(curso.id)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal para crear curso */}
            {showModal && (
                <div className={Style.modal}>
                    <div className={Style.modalContent}>
                        <div className={Style.modalHeader}>
                            <h2>Crear Nuevo Curso</h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => setShowModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className={Style.modalForm}>
                            <div className={Style.formGroup}>
                                <label>Título del curso *</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    placeholder="Ej: Introducción a la Programación"
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Descripción *</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleInputChange}
                                    placeholder="Describe de qué trata el curso..."
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Objetivos del curso</label>
                                <textarea
                                    name="objetivos"
                                    value={formData.objetivos}
                                    onChange={handleInputChange}
                                    placeholder="¿Qué aprenderán los estudiantes?"
                                    rows="3"
                                />
                            </div>

                            <div className={Style.formRow}>
                                <div className={Style.formGroup}>
                                    <label>Categoría</label>
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleInputChange}
                                    >
                                        <option value="programacion">Programación</option>
                                        <option value="diseño">Diseño</option>
                                        <option value="negocios">Negocios</option>
                                        <option value="idiomas">Idiomas</option>
                                        <option value="ciencias">Ciencias</option>
                                    </select>
                                </div>

                                <div className={Style.formGroup}>
                                    <label>Duración</label>
                                    <input
                                        type="text"
                                        name="duracion"
                                        value={formData.duracion}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 8 semanas, 40 horas"
                                    />
                                </div>
                            </div>

                            <div className={Style.formGroup}>
                                <label>URL de imagen (opcional)</label>
                                <input
                                    type="url"
                                    name="imagen"
                                    value={formData.imagen}
                                    onChange={handleInputChange}
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                />
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
                                    Crear Curso
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GestionCursos;

