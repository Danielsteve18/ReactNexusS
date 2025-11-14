import { useState } from 'react';
import Style from './shared.module.css';

function ModalRevisarEntregas({ tarea, curso, onClose, onCalificar }) {
    const [selectedEntrega, setSelectedEntrega] = useState(null);
    const [calificacion, setCalificacion] = useState({
        puntaje: 0,
        comentarios: ''
    });

    const entregas = tarea.entregas || [];
    const estudiantesMap = {};
    
    // Crear mapa de estudiantes
    curso.estudiantes?.forEach(est => {
        estudiantesMap[est.id] = est.nombre || est.id;
    });

    const handleCalificar = async () => {
        if (!selectedEntrega) return;
        
        if (calificacion.puntaje < 0 || calificacion.puntaje > tarea.puntaje) {
            alert(`El puntaje debe estar entre 0 y ${tarea.puntaje}`);
            return;
        }

        await onCalificar(selectedEntrega.estudianteId, {
            puntaje: parseFloat(calificacion.puntaje),
            comentarios: calificacion.comentarios,
            fechaCalificacion: new Date()
        });

        setSelectedEntrega(null);
        setCalificacion({ puntaje: 0, comentarios: '' });
    };

    const getEstadoColor = (estado) => {
        switch(estado) {
            case 'calificada': return '#28a745';
            case 'pendiente': return '#ffc107';
            default: return '#6c757d';
        }
    };

    const formatFecha = (fecha) => {
        if (!fecha) return '';
        const date = fecha.toDate ? fecha.toDate() : new Date(fecha);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={Style.modal}>
            <div className={Style.modalContent} style={{ maxWidth: '900px' }}>
                <div className={Style.modalHeader}>
                    <div>
                        <h2>Revisar Entregas</h2>
                        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '0.9rem' }}>
                            {tarea.titulo}
                        </p>
                    </div>
                    <button 
                        className={Style.closeBtn}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    {/* Lista de entregas */}
                    <div style={{ flex: '1', maxHeight: '500px', overflowY: 'auto' }}>
                        <h3 style={{ marginTop: '0', fontSize: '1.1rem' }}>
                            Entregas ({entregas.length})
                        </h3>
                        
                        {entregas.length === 0 ? (
                            <div style={{ 
                                padding: '40px', 
                                textAlign: 'center', 
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                color: '#999'
                            }}>
                                No hay entregas todavía
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {entregas.map((entrega) => (
                                    <div 
                                        key={entrega.estudianteId}
                                        onClick={() => setSelectedEntrega(entrega)}
                                        style={{
                                            padding: '15px',
                                            background: selectedEntrega?.estudianteId === entrega.estudianteId 
                                                ? '#e7f3ff' : '#f8f9fa',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            border: selectedEntrega?.estudianteId === entrega.estudianteId
                                                ? '2px solid #667eea' : '2px solid transparent',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '8px'
                                        }}>
                                            <strong>{estudiantesMap[entrega.estudianteId] || 'Estudiante'}</strong>
                                            <span 
                                                style={{ 
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    background: getEstadoColor(entrega.estado),
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {entrega.estado === 'calificada' ? '✓ Calificada' : '⏳ Pendiente'}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                            📅 {formatFecha(entrega.fechaEntrega)}
                                        </div>
                                        {entrega.estado === 'calificada' && (
                                            <div style={{ 
                                                fontSize: '0.9rem', 
                                                color: '#28a745',
                                                fontWeight: 'bold',
                                                marginTop: '5px'
                                            }}>
                                                🎯 {entrega.puntaje}/{tarea.puntaje} pts
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Panel de detalles y calificación */}
                    <div style={{ flex: '1', borderLeft: '1px solid #e0e0e0', paddingLeft: '20px' }}>
                        {selectedEntrega ? (
                            <>
                                <h3 style={{ marginTop: '0', fontSize: '1.1rem' }}>
                                    Detalles de la Entrega
                                </h3>
                                
                                <div style={{ 
                                    background: '#f8f9fa', 
                                    padding: '15px', 
                                    borderRadius: '8px',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{ marginBottom: '12px' }}>
                                        <strong>Estudiante:</strong>
                                        <div style={{ marginTop: '5px' }}>
                                            {estudiantesMap[selectedEntrega.estudianteId] || 'Estudiante'}
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginBottom: '12px' }}>
                                        <strong>Fecha de entrega:</strong>
                                        <div style={{ marginTop: '5px' }}>
                                            {formatFecha(selectedEntrega.fechaEntrega)}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '12px' }}>
                                        <strong>Archivo en Drive:</strong>
                                        <div style={{ marginTop: '8px' }}>
                                            <a 
                                                href={selectedEntrega.driveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    padding: '10px 16px',
                                                    background: '#4285f4',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    borderRadius: '6px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                                                </svg>
                                                Abrir en Google Drive
                                            </a>
                                        </div>
                                    </div>

                                    {selectedEntrega.comentarios && (
                                        <div>
                                            <strong>Comentarios del estudiante:</strong>
                                            <div style={{ 
                                                marginTop: '5px',
                                                padding: '10px',
                                                background: 'white',
                                                borderRadius: '6px',
                                                fontSize: '0.9rem'
                                            }}>
                                                {selectedEntrega.comentarios}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Formulario de calificación */}
                                <div style={{
                                    background: selectedEntrega.estado === 'calificada' 
                                        ? '#d4edda' : '#fff',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    border: selectedEntrega.estado === 'calificada'
                                        ? '2px solid #28a745' : '2px solid #e0e0e0'
                                }}>
                                    <h4 style={{ margin: '0 0 15px 0' }}>
                                        {selectedEntrega.estado === 'calificada' 
                                            ? '✓ Tarea Calificada' 
                                            : 'Calificar Tarea'}
                                    </h4>
                                    
                                    {selectedEntrega.estado === 'calificada' ? (
                                        <div>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745', marginBottom: '10px' }}>
                                                {selectedEntrega.puntaje}/{tarea.puntaje} pts
                                            </div>
                                            {selectedEntrega.comentariosProfesor && (
                                                <div>
                                                    <strong>Comentarios:</strong>
                                                    <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>
                                                        {selectedEntrega.comentariosProfesor}
                                                    </p>
                                                </div>
                                            )}
                                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px' }}>
                                                Calificada el {formatFecha(selectedEntrega.fechaCalificacion)}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setCalificacion({
                                                        puntaje: selectedEntrega.puntaje,
                                                        comentarios: selectedEntrega.comentariosProfesor || ''
                                                    });
                                                    // Permitir recalificar
                                                }}
                                                style={{
                                                    marginTop: '15px',
                                                    padding: '8px 16px',
                                                    background: '#667eea',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Modificar Calificación
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                                    Puntaje (máximo {tarea.puntaje} pts)
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={tarea.puntaje}
                                                    step="0.5"
                                                    value={calificacion.puntaje}
                                                    onChange={(e) => setCalificacion({
                                                        ...calificacion,
                                                        puntaje: e.target.value
                                                    })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '6px',
                                                        fontSize: '1rem'
                                                    }}
                                                />
                                            </div>

                                            <div style={{ marginBottom: '15px' }}>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                                    Comentarios para el estudiante
                                                </label>
                                                <textarea
                                                    value={calificacion.comentarios}
                                                    onChange={(e) => setCalificacion({
                                                        ...calificacion,
                                                        comentarios: e.target.value
                                                    })}
                                                    rows="4"
                                                    placeholder="Retroalimentación para el estudiante..."
                                                    style={{
                                                        width: '100%',
                                                        padding: '10px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '6px',
                                                        fontSize: '0.9rem',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>

                                            <button
                                                onClick={handleCalificar}
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    background: '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ✓ Guardar Calificación
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div style={{ 
                                padding: '60px 20px',
                                textAlign: 'center',
                                color: '#999'
                            }}>
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 15px' }}>
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                <p>Selecciona una entrega para revisarla</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRevisarEntregas;
