import { useState } from 'react';
import Style from './shared.module.css';

function ModalEntregarTarea({ tarea, cursoId, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        driveLink: '',
        comentarios: ''
    });
    const [isValidLink, setIsValidLink] = useState(true);

    const validateDriveLink = (link) => {
        // Validar que sea un link de Google Drive
        const drivePatterns = [
            /drive\.google\.com/,
            /docs\.google\.com/,
            /sheets\.google\.com/,
            /slides\.google\.com/
        ];
        return drivePatterns.some(pattern => pattern.test(link));
    };

    const handleLinkChange = (e) => {
        const link = e.target.value;
        setFormData({ ...formData, driveLink: link });
        if (link) {
            setIsValidLink(validateDriveLink(link));
        } else {
            setIsValidLink(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.driveLink) {
            alert('Por favor ingresa el link de Google Drive');
            return;
        }

        if (!validateDriveLink(formData.driveLink)) {
            alert('Por favor ingresa un link válido de Google Drive');
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className={Style.modal}>
            <div className={Style.modalContent}>
                <div className={Style.modalHeader}>
                    <h2>Entregar Tarea</h2>
                    <button 
                        className={Style.closeBtn}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f7ff', borderRadius: '8px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{tarea.titulo}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>{tarea.descripcion}</p>
                    <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 'bold' }}>
                        📅 Fecha límite: {tarea.fechaEntrega}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 'bold', marginTop: '5px' }}>
                        🎯 Puntaje: {tarea.puntaje} pts
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className={Style.modalForm}>
                    <div className={Style.formGroup}>
                        <label>Link de Google Drive *</label>
                        <input
                            type="url"
                            value={formData.driveLink}
                            onChange={handleLinkChange}
                            placeholder="https://drive.google.com/file/d/..."
                            required
                            style={{
                                borderColor: !isValidLink ? '#ff4757' : '#ddd'
                            }}
                        />
                        {!isValidLink && (
                            <small style={{ color: '#ff4757', fontSize: '0.85rem', display: 'block', marginTop: '5px' }}>
                                ⚠️ Por favor ingresa un link válido de Google Drive
                            </small>
                        )}
                        <small style={{ color: '#666', fontSize: '0.85rem', display: 'block', marginTop: '5px' }}>
                            💡 Asegúrate de que el archivo tenga permisos de visualización para cualquier persona con el link
                        </small>
                    </div>

                    <div className={Style.formGroup}>
                        <label>Comentarios adicionales (opcional)</label>
                        <textarea
                            value={formData.comentarios}
                            onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                            rows="4"
                            placeholder="Agrega cualquier comentario o nota sobre tu entrega..."
                        />
                    </div>

                    <div style={{ 
                        background: '#fff3cd', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem',
                        color: '#856404'
                    }}>
                        <strong>📋 Instrucciones:</strong>
                        <ol style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
                            <li>Sube tu archivo a Google Drive</li>
                            <li>Haz clic derecho en el archivo → "Obtener enlace"</li>
                            <li>Cambia los permisos a "Cualquier persona con el enlace"</li>
                            <li>Copia el enlace y pégalo arriba</li>
                        </ol>
                    </div>

                    <div className={Style.modalActions}>
                        <button 
                            type="button" 
                            className={Style.cancelBtn}
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className={Style.submitBtn}
                            disabled={!isValidLink}
                        >
                            📤 Entregar Tarea
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEntregarTarea;
