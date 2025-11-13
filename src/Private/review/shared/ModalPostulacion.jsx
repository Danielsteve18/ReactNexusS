import { useState } from 'react';
import Style from './shared.module.css';
import { postularseConvocatoria } from '../../../firebase/services/convocatorias';

function ModalPostulacion({ convocatoria, onClose, userId, userName, onSuccess }) {
    const [formData, setFormData] = useState({
        nombreCompleto: userName || '',
        numeroIdentidad: '',
        codigoEstudiantil: '',
        email: '',
        telefono: '',
        carrera: '',
        semestre: '',
        motivacion: ''
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!formData.nombreCompleto || !formData.numeroIdentidad || !formData.codigoEstudiantil || 
            !formData.email || !formData.telefono || !formData.motivacion) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        if (formData.numeroIdentidad.length < 5) {
            alert('El número de identidad debe tener al menos 5 caracteres');
            return;
        }

        if (formData.motivacion.length < 50) {
            alert('La motivación debe tener al menos 50 caracteres');
            return;
        }

        setLoading(true);

        const postulacionData = {
            estudianteId: userId,
            nombreCompleto: formData.nombreCompleto,
            numeroIdentidad: formData.numeroIdentidad,
            codigoEstudiantil: formData.codigoEstudiantil,
            email: formData.email,
            telefono: formData.telefono,
            carrera: formData.carrera,
            semestre: formData.semestre,
            motivacion: formData.motivacion
        };

        const result = await postularseConvocatoria(convocatoria.id, postulacionData);
        
        if (result.success) {
            alert('✅ Postulación enviada exitosamente. El profesor revisará tu solicitud.');
            onSuccess();
            onClose();
        } else {
            alert('❌ ' + result.error);
        }
        
        setLoading(false);
    };

    return (
        <div className={Style.modal} onClick={onClose}>
            <div className={Style.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <div className={Style.modalHeader}>
                    <h2>📝 Postulación a Convocatoria</h2>
                    <button className={Style.closeBtn} onClick={onClose}>×</button>
                </div>

                <div style={{ 
                    background: '#f0f7ff', 
                    padding: '15px', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    borderLeft: '4px solid #667eea'
                }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#667eea' }}>{convocatoria.titulo}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                        Completa el formulario para postularte a esta convocatoria
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={Style.modalForm}>
                    <div className={Style.formRow}>
                        <div className={Style.formGroup}>
                            <label>Nombre Completo *</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputChange}
                                placeholder="Ej: Juan Pérez García"
                                required
                            />
                        </div>

                        <div className={Style.formGroup}>
                            <label>Número de Identidad *</label>
                            <input
                                type="text"
                                name="numeroIdentidad"
                                value={formData.numeroIdentidad}
                                onChange={handleInputChange}
                                placeholder="Ej: 1234567890"
                                required
                            />
                        </div>
                    </div>

                    <div className={Style.formRow}>
                        <div className={Style.formGroup}>
                            <label>Código Estudiantil *</label>
                            <input
                                type="text"
                                name="codigoEstudiantil"
                                value={formData.codigoEstudiantil}
                                onChange={handleInputChange}
                                placeholder="Ej: EST-2024-001"
                                required
                            />
                        </div>

                        <div className={Style.formGroup}>
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div className={Style.formRow}>
                        <div className={Style.formGroup}>
                            <label>Teléfono *</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                placeholder="Ej: +1234567890"
                                required
                            />
                        </div>

                        <div className={Style.formGroup}>
                            <label>Semestre (opcional)</label>
                            <input
                                type="text"
                                name="semestre"
                                value={formData.semestre}
                                onChange={handleInputChange}
                                placeholder="Ej: 5to semestre"
                            />
                        </div>
                    </div>

                    <div className={Style.formGroup}>
                        <label>Carrera (opcional)</label>
                        <input
                            type="text"
                            name="carrera"
                            value={formData.carrera}
                            onChange={handleInputChange}
                            placeholder="Ej: Ingeniería en Sistemas"
                        />
                    </div>

                    <div className={Style.formGroup}>
                        <label>
                            ¿Por qué quieres participar en esta convocatoria? * 
                            <span style={{ fontSize: '0.85rem', color: '#999' }}> (mínimo 50 caracteres)</span>
                        </label>
                        <textarea
                            name="motivacion"
                            value={formData.motivacion}
                            onChange={handleInputChange}
                            placeholder="Explica tus motivaciones, intereses y qué esperas aprender..."
                            rows="5"
                            required
                            style={{ minHeight: '100px' }}
                        />
                        <div style={{ 
                            textAlign: 'right', 
                            fontSize: '0.85rem', 
                            color: formData.motivacion.length >= 50 ? '#2ecc71' : '#999',
                            marginTop: '5px'
                        }}>
                            {formData.motivacion.length} / 50 caracteres mínimos
                        </div>
                    </div>

                    <div className={Style.modalActions}>
                        <button 
                            type="button" 
                            className={Style.cancelBtn}
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className={Style.submitBtn}
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : '📤 Enviar Postulación'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalPostulacion;
