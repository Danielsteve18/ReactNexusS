import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../shared/shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { getCursosByProfesor, updateCurso } from "../../../firebase/services/cursos";
import { profesorMenuItems } from '../../../utils/menuItems';

function AulaVirtual() {
    const navigate = useNavigate();
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [linkForm, setLinkForm] = useState({
        titulo: '',
        plataforma: 'meet',
        url: '',
        descripcion: '',
        horaClase: '',
        diasClase: ''
    });

    useEffect(() => {
        const id = localStorage.getItem('userId');
        setUserId(id);
        if (id) {
            loadCursos(id);
        } else {
            setLoading(false);
        }
    }, []);

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

    const handleAgregarLink = (curso) => {
        setSelectedCurso(curso);
        setShowModal(true);
        if (curso.aulaVirtual) {
            setLinkForm(curso.aulaVirtual);
        } else {
            setLinkForm({
                titulo: '',
                plataforma: 'meet',
                url: '',
                descripcion: '',
                horaClase: '',
                diasClase: ''
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!linkForm.url) {
            alert('Por favor ingresa la URL de la clase');
            return;
        }

        const result = await updateCurso(selectedCurso.id, {
            aulaVirtual: linkForm
        });

        if (result.success) {
            alert('Link de aula virtual guardado exitosamente');
            setShowModal(false);
            setSelectedCurso(null);
            loadCursos(userId);
        } else {
            alert('Error al guardar: ' + result.error);
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

    const getPlataformaColor = (plataforma) => {
        switch(plataforma) {
            case 'meet': return '#34A853';
            case 'zoom': return '#2D8CFF';
            case 'teams': return '#6264A7';
            case 'classroom': return '#0F9D58';
            default: return '#667eea';
        }
    };

    return (
        <div className={Style.container}>
            <Barra_Left items={profesorMenuItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>Aula Virtual</h1>
                    <p>Gestiona los enlaces de clases virtuales para tus cursos</p>
                </div>

                {loading ? (
                    <div className={Style.loadingState}>
                        <div className={Style.spinner}></div>
                        <p>Cargando cursos...</p>
                    </div>
                ) : cursos.length === 0 ? (
                    <div className={Style.emptyState}>
                        <p>No tienes cursos creados</p>
                        <p className={Style.subText}>Crea cursos desde la sección Mis Cursos</p>
                    </div>
                ) : (
                    <div className={Style.coursesGrid}>
                        {cursos.map((curso) => (
                            <div 
                                key={curso.id} 
                                className={Style.cursoCard}
                                style={{ borderTop: `4px solid ${getCategoriaColor(curso.categoria)}` }}
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
                                            style={{ background: getCategoriaColor(curso.categoria) }}
                                        >
                                            {curso.categoria}
                                        </span>
                                        {curso.aulaVirtual && (
                                            <span 
                                                className={Style.badge}
                                                style={{ background: getPlataformaColor(curso.aulaVirtual.plataforma) }}
                                            >
                                                Configurado
                                            </span>
                                        )}
                                    </div>
                                    
                                    <h3>{curso.titulo}</h3>
                                    <p className={Style.descripcion}>
                                        {curso.descripcion?.substring(0, 100)}
                                        {curso.descripcion?.length > 100 && '...'}
                                    </p>

                                    {curso.aulaVirtual && (
                                        <div style={{
                                            background: '#f8f9fa',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            marginTop: '12px',
                                            fontSize: '0.85rem'
                                        }}>
                                            <strong>{curso.aulaVirtual.titulo || 'Clase Virtual'}</strong>
                                            {curso.aulaVirtual.horaClase && (
                                                <div style={{ marginTop: '5px', color: '#666' }}>
                                                    Horario: {curso.aulaVirtual.horaClase}
                                                </div>
                                            )}
                                            {curso.aulaVirtual.diasClase && (
                                                <div style={{ marginTop: '5px', color: '#666' }}>
                                                    Días: {curso.aulaVirtual.diasClase}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div className={Style.stats} style={{ marginTop: '15px' }}>
                                        <span>Estudiantes: {curso.estudiantes?.length || 0}</span>
                                    </div>
                                    
                                    <div className={Style.cardActions} style={{ marginTop: '15px' }}>
                                        <button 
                                            className={Style.primaryBtn}
                                            onClick={() => handleAgregarLink(curso)}
                                            style={{
                                                flex: 1,
                                                background: curso.aulaVirtual 
                                                    ? getPlataformaColor(curso.aulaVirtual.plataforma)
                                                    : '#667eea'
                                            }}
                                        >
                                            {curso.aulaVirtual ? 'Editar Link' : 'Agregar Link'}
                                        </button>
                                        {curso.aulaVirtual && (
                                            <a 
                                                href={curso.aulaVirtual.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={Style.viewBtn}
                                                style={{ textDecoration: 'none', textAlign: 'center' }}
                                            >
                                                Probar
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showModal && selectedCurso && (
                <div className={Style.modal}>
                    <div className={Style.modalContent}>
                        <div className={Style.modalHeader}>
                            <h2>
                                {selectedCurso.aulaVirtual ? 'Editar' : 'Agregar'} Link de Aula Virtual
                            </h2>
                            <button 
                                className={Style.closeBtn}
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedCurso(null);
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ 
                            background: '#f0f7ff', 
                            padding: '12px', 
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <strong>Curso:</strong> {selectedCurso.titulo}
                        </div>
                        
                        <form onSubmit={handleSubmit} className={Style.modalForm}>
                            <div className={Style.formGroup}>
                                <label>Título de la clase *</label>
                                <input
                                    type="text"
                                    value={linkForm.titulo}
                                    onChange={(e) => setLinkForm({...linkForm, titulo: e.target.value})}
                                    placeholder="Ej: Clase semanal de programación"
                                    required
                                />
                            </div>

                            <div className={Style.formGroup}>
                                <label>Plataforma *</label>
                                <select
                                    value={linkForm.plataforma}
                                    onChange={(e) => setLinkForm({...linkForm, plataforma: e.target.value})}
                                    required
                                >
                                    <option value="meet">Google Meet</option>
                                    <option value="zoom">Zoom</option>
                                    <option value="teams">Microsoft Teams</option>
                                    <option value="classroom">Google Classroom</option>
                                    <option value="otro">Otra plataforma</option>
                                </select>
                            </div>

                            <div className={Style.formGroup}>
                                <label>URL de la clase *</label>
                                <input
                                    type="url"
                                    value={linkForm.url}
                                    onChange={(e) => setLinkForm({...linkForm, url: e.target.value})}
                                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                                    required
                                />
                                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                                    Copia y pega el enlace completo de tu reunión
                                </small>
                            </div>

                            <div className={Style.formRow}>
                                <div className={Style.formGroup}>
                                    <label>Horario de clase</label>
                                    <input
                                        type="text"
                                        value={linkForm.horaClase}
                                        onChange={(e) => setLinkForm({...linkForm, horaClase: e.target.value})}
                                        placeholder="Ej: 10:00 AM - 12:00 PM"
                                    />
                                </div>

                                <div className={Style.formGroup}>
                                    <label>Días de clase</label>
                                    <input
                                        type="text"
                                        value={linkForm.diasClase}
                                        onChange={(e) => setLinkForm({...linkForm, diasClase: e.target.value})}
                                        placeholder="Ej: Lunes, Miércoles y Viernes"
                                    />
                                </div>
                            </div>

                            <div className={Style.formGroup}>
                                <label>Descripción o instrucciones</label>
                                <textarea
                                    value={linkForm.descripcion}
                                    onChange={(e) => setLinkForm({...linkForm, descripcion: e.target.value})}
                                    rows="3"
                                    placeholder="Instrucciones adicionales para los estudiantes..."
                                />
                            </div>

                            <div className={Style.modalActions}>
                                <button 
                                    type="button" 
                                    className={Style.cancelBtn}
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedCurso(null);
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className={Style.submitBtn}
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AulaVirtual;
