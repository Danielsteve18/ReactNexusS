import { useState } from 'react';
import Style from './shared.module.css';
import { actualizarEstadoPostulante, cerrarYCrearCurso } from '../../../firebase/services/convocatorias';
import { useNavigate } from 'react-router-dom';

function ModalPostulantes({ convocatoria, onClose, onUpdate }) {
    const [loading, setLoading] = useState(false);
    const [creandoCurso, setCreandoCurso] = useState(false);
    const navigate = useNavigate();

    const postulantes = convocatoria.postulantes || [];
    const pendientes = postulantes.filter(p => p.estado === 'pendiente');
    const aceptados = postulantes.filter(p => p.estado === 'aceptado');
    const rechazados = postulantes.filter(p => p.estado === 'rechazado');

    const handleEstadoChange = async (estudianteId, nuevoEstado) => {
        setLoading(true);
        const result = await actualizarEstadoPostulante(convocatoria.id, estudianteId, nuevoEstado);
        
        if (result.success) {
            alert(`✅ Postulante ${nuevoEstado === 'aceptado' ? 'aceptado' : 'rechazado'}`);
            onUpdate();
        } else {
            alert('❌ ' + result.error);
        }
        setLoading(false);
    };

    const handleCrearCurso = async () => {
        if (aceptados.length === 0) {
            alert('⚠️ Debes aceptar al menos un estudiante antes de crear el curso');
            return;
        }

        if (!window.confirm(
            `¿Crear curso con ${aceptados.length} estudiante(s) aceptado(s)?\n\n` +
            `Esto cerrará la convocatoria y creará automáticamente el curso.`
        )) {
            return;
        }

        setCreandoCurso(true);
        const result = await cerrarYCrearCurso(convocatoria.id);
        
        if (result.success) {
            alert('✅ ¡Curso creado exitosamente!');
            navigate('/view-cursos');
        } else {
            alert('❌ ' + result.error);
        }
        setCreandoCurso(false);
    };

    const formatFecha = (fecha) => {
        if (!fecha) return 'N/A';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const PostulanteCard = ({ postulante }) => {
        const estadoColor = {
            pendiente: '#ffa502',
            aceptado: '#2ecc71',
            rechazado: '#ff4757'
        };

        const estadoIcon = {
            pendiente: '⏳',
            aceptado: '✅',
            rechazado: '❌'
        };

        return (
            <div style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderLeft: `4px solid ${estadoColor[postulante.estado]}`,
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div>
                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                            {postulante.nombreCompleto}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                            <div><strong>📧 Email:</strong> {postulante.email}</div>
                            <div><strong>📱 Teléfono:</strong> {postulante.telefono}</div>
                            <div><strong>🎓 Código:</strong> {postulante.codigoEstudiantil}</div>
                            <div><strong>🆔 Identidad:</strong> {postulante.numeroIdentidad}</div>
                            {postulante.carrera && <div><strong>📚 Carrera:</strong> {postulante.carrera}</div>}
                            {postulante.semestre && <div><strong>📖 Semestre:</strong> {postulante.semestre}</div>}
                        </div>
                    </div>
                    <span style={{
                        background: estadoColor[postulante.estado],
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                        {estadoIcon[postulante.estado]} {postulante.estado.toUpperCase()}
                    </span>
                </div>

                <div style={{
                    background: '#f9f9f9',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '10px'
                }}>
                    <strong style={{ fontSize: '0.9rem', color: '#555' }}>💭 Motivación:</strong>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>
                        {postulante.motivacion}
                    </p>
                </div>

                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#999'
                }}>
                    <span>📅 Postulado: {formatFecha(postulante.fechaPostulacion)}</span>
                    
                    {postulante.estado === 'pendiente' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => handleEstadoChange(postulante.estudianteId, 'aceptado')}
                                disabled={loading}
                                style={{
                                    background: '#2ecc71',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 14px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '500'
                                }}
                            >
                                ✓ Aceptar
                            </button>
                            <button
                                onClick={() => handleEstadoChange(postulante.estudianteId, 'rechazado')}
                                disabled={loading}
                                style={{
                                    background: '#ff4757',
                                    color: 'white',
                                    border: 'none',
                                    padding: '6px 14px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '500'
                                }}
                            >
                                ✕ Rechazar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={Style.modal} onClick={onClose}>
            <div className={Style.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', maxHeight: '90vh', overflow: 'auto' }}>
                <div className={Style.modalHeader}>
                    <div>
                        <h2>👥 Gestión de Postulantes</h2>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                            {convocatoria.titulo}
                        </p>
                    </div>
                    <button className={Style.closeBtn} onClick={onClose}>×</button>
                </div>

                {/* Estadísticas */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    marginBottom: '25px'
                }}>
                    <div style={{ background: '#ffa502', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{pendientes.length}</div>
                        <div style={{ fontSize: '0.9rem' }}>Pendientes</div>
                    </div>
                    <div style={{ background: '#2ecc71', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{aceptados.length}</div>
                        <div style={{ fontSize: '0.9rem' }}>Aceptados</div>
                    </div>
                    <div style={{ background: '#ff4757', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{rechazados.length}</div>
                        <div style={{ fontSize: '0.9rem' }}>Rechazados</div>
                    </div>
                    <div style={{ background: '#667eea', color: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{postulantes.length}</div>
                        <div style={{ fontSize: '0.9rem' }}>Total</div>
                    </div>
                </div>

                {/* Botón para crear curso */}
                {aceptados.length > 0 && convocatoria.estado !== 'convertida' && (
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '25px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>🎉 ¡Listo para crear el curso!</h3>
                        <p style={{ margin: '0 0 15px 0', opacity: 0.9 }}>
                            Tienes {aceptados.length} estudiante(s) aceptado(s)
                        </p>
                        <button
                            onClick={handleCrearCurso}
                            disabled={creandoCurso}
                            style={{
                                background: 'white',
                                color: '#667eea',
                                border: 'none',
                                padding: '12px 30px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600'
                            }}
                        >
                            {creandoCurso ? '⏳ Creando curso...' : '🚀 Cerrar convocatoria y crear curso'}
                        </button>
                    </div>
                )}

                {convocatoria.estado === 'convertida' && (
                    <div style={{
                        background: '#f0f0f0',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        textAlign: 'center',
                        color: '#666'
                    }}>
                        ✅ Esta convocatoria ya fue convertida en curso
                    </div>
                )}

                {/* Lista de postulantes */}
                <div className={Style.modalBody}>
                    {pendientes.length > 0 && (
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: '#ffa502', marginBottom: '15px' }}>⏳ Pendientes ({pendientes.length})</h3>
                            {pendientes.map(postulante => (
                                <PostulanteCard key={postulante.estudianteId} postulante={postulante} />
                            ))}
                        </div>
                    )}

                    {aceptados.length > 0 && (
                        <div style={{ marginBottom: '25px' }}>
                            <h3 style={{ color: '#2ecc71', marginBottom: '15px' }}>✅ Aceptados ({aceptados.length})</h3>
                            {aceptados.map(postulante => (
                                <PostulanteCard key={postulante.estudianteId} postulante={postulante} />
                            ))}
                        </div>
                    )}

                    {rechazados.length > 0 && (
                        <div>
                            <h3 style={{ color: '#ff4757', marginBottom: '15px' }}>❌ Rechazados ({rechazados.length})</h3>
                            {rechazados.map(postulante => (
                                <PostulanteCard key={postulante.estudianteId} postulante={postulante} />
                            ))}
                        </div>
                    )}

                    {postulantes.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 15px' }}>
                                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>Aún no hay postulantes para esta convocatoria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalPostulantes;
