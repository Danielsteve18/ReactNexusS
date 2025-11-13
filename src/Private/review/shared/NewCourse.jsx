import { useState, useEffect } from "react";
import Style from "./shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { 
    getCursos, 
    getCursosByEstudiante, 
    inscribirEstudiante 
} from "../../../firebase/services/cursos";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const studentItems = [
    { href: "/view-new-course", content: "Nuevo Curso" },
    { href: "/view-foro", content: "Foros" },
    { href: "/view-config", content: "Configuraciones" },
    { href: "/view-activity", content: "Actividad" },
    { href: "/view-convocatorias", content: "Convocatorias" },
];

function NewCourse() {
    const [cursos, setCursos] = useState([]);
    const [misCursos, setMisCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [userId, setUserId] = useState('');
    const [selectedCurso, setSelectedCurso] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
        loadCursos(id);
    }, []);

    const loadCursos = async (id) => {
        setLoading(true);
        try {
            const [cursosResult, misCursosResult] = await Promise.all([
                getCursos(),
                getCursosByEstudiante(id)
            ]);
            
            if (cursosResult.success) {
                setCursos(cursosResult.data);
            }
            
            if (misCursosResult.success) {
                setMisCursos(misCursosResult.data);
            }
        } catch (error) {
            console.error("Error cargando cursos:", error);
        }
        setLoading(false);
    };

    const handleInscribir = async (cursoId) => {
        if (window.confirm('¿Deseas inscribirte en este curso?')) {
            const result = await inscribirEstudiante(cursoId, userId);
            
            if (result.success) {
                alert('¡Te has inscrito exitosamente!');
                loadCursos(userId);
            } else {
                alert('Error al inscribirse: ' + result.error);
            }
        }
    };

    const isInscrito = (cursoId) => {
        return misCursos.some(curso => curso.id === cursoId);
    };

    const filteredCursos = cursos.filter(curso =>
        curso.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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

    return (
        <div className={Style.container}>
            <Barra_Left items={studentItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>🎓 Explorar Nuevos Cursos</h1>
                    <p>Descubre y únete a cursos disponibles</p>
                </div>

                <div className={Style.searchSection}>
                    <div className={Style.searchBar}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Buscar cursos por nombre, categoría..." 
                            className={Style.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className={Style.loadingState}>
                        <div className={Style.spinner}></div>
                        <p>Cargando cursos...</p>
                    </div>
                ) : filteredCursos.length === 0 ? (
                    <div className={Style.coursesGrid}>
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>No se encontraron cursos</p>
                            <p className={Style.subText}>Intenta con otros términos de búsqueda</p>
                        </div>
                    </div>
                ) : (
                    <div className={Style.coursesGrid}>
                        {filteredCursos.map((curso) => (
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
                                        {curso.categoria && (
                                            <span 
                                                className={Style.badge}
                                                style={{ 
                                                    background: getCategoriaColor(curso.categoria) 
                                                }}
                                            >
                                                {curso.categoria}
                                            </span>
                                        )}
                                        {isInscrito(curso.id) && (
                                            <span 
                                                className={Style.badge}
                                                style={{ background: '#25d366' }}
                                            >
                                                ✓ Inscrito
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3>{curso.titulo}</h3>
                                    <p className={Style.descripcion}>
                                        {curso.descripcion?.substring(0, 120)}
                                        {curso.descripcion?.length > 120 && '...'}
                                    </p>
                                    
                                    <div className={Style.cursoMeta}>
                                        {curso.profesorNombre && (
                                            <div className={Style.profesor}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                                {curso.profesorNombre}
                                            </div>
                                        )}
                                        
                                        {curso.duracion && (
                                            <div className={Style.duracion}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                                {curso.duracion}
                                            </div>
                                        )}
                                        
                                        {curso.estudiantes && (
                                            <div className={Style.estudiantes}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2"/>
                                                </svg>
                                                {curso.estudiantes.length} estudiantes
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className={Style.cardActions}>
                                        <button 
                                            className={Style.viewBtn}
                                            onClick={() => setSelectedCurso(curso)}
                                        >
                                            Ver más
                                        </button>
                                        
                                        {!isInscrito(curso.id) && (
                                            <button 
                                                className={Style.inscribirBtn}
                                                onClick={() => handleInscribir(curso.id)}
                                            >
                                                Inscribirse
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal de detalles del curso */}
                {selectedCurso && (
                    <div className={Style.modal} onClick={() => setSelectedCurso(null)}>
                        <div className={Style.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={Style.modalHeader}>
                                <h2>{selectedCurso.titulo}</h2>
                                <button 
                                    className={Style.closeBtn}
                                    onClick={() => setSelectedCurso(null)}
                                >
                                    ×
                                </button>
                            </div>
                            
                            <div className={Style.modalBody}>
                                {selectedCurso.imagen && (
                                    <img 
                                        src={selectedCurso.imagen} 
                                        alt={selectedCurso.titulo}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                            marginBottom: '20px'
                                        }}
                                    />
                                )}
                                
                                <div className={Style.detailBadges}>
                                    {selectedCurso.categoria && (
                                        <span 
                                            className={Style.badge}
                                            style={{ 
                                                background: getCategoriaColor(selectedCurso.categoria) 
                                            }}
                                        >
                                            {selectedCurso.categoria}
                                        </span>
                                    )}
                                    {isInscrito(selectedCurso.id) && (
                                        <span 
                                            className={Style.badge}
                                            style={{ background: '#25d366' }}
                                        >
                                            ✓ Ya estás inscrito
                                        </span>
                                    )}
                                </div>
                                
                                <div className={Style.detailSection}>
                                    <h3>Descripción</h3>
                                    <p>{selectedCurso.descripcion}</p>
                                </div>
                                
                                {selectedCurso.objetivos && (
                                    <div className={Style.detailSection}>
                                        <h3>Objetivos del curso</h3>
                                        <p>{selectedCurso.objetivos}</p>
                                    </div>
                                )}
                                
                                {selectedCurso.profesorNombre && (
                                    <div className={Style.detailSection}>
                                        <h3>Instructor</h3>
                                        <p>{selectedCurso.profesorNombre}</p>
                                    </div>
                                )}
                                
                                {selectedCurso.duracion && (
                                    <div className={Style.detailSection}>
                                        <h3>Duración</h3>
                                        <p>{selectedCurso.duracion}</p>
                                    </div>
                                )}
                                
                                <div className={Style.detailSection}>
                                    <h3>Fecha de creación</h3>
                                    <p>{formatDate(selectedCurso.createdAt)}</p>
                                </div>
                                
                                {!isInscrito(selectedCurso.id) && (
                                    <div className={Style.modalActions}>
                                        <button 
                                            className={Style.submitBtn}
                                            onClick={() => {
                                                handleInscribir(selectedCurso.id);
                                                setSelectedCurso(null);
                                            }}
                                        >
                                            Inscribirse en este curso
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewCourse;
