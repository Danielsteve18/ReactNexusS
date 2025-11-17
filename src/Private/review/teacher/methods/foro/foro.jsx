import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Style from "../foro/foro.module.css";
import { 
    createForo, 
    getForos, 
    getForosByUsuario,
    addMensaje,
    deleteForo,
    deleteMensaje
} from "../../../../../firebase/services/foros";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

function Foro() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [foros, setForos] = useState([]);
    const [misForos, setMisForos] = useState([]);
    const [showMyForos, setShowMyForos] = useState(false);
    const [selectedForo, setSelectedForo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Estados del formulario
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        categoria: 'general'
    });

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('userId');
        setUserRole(role);
        setUserId(id);
        
        fetchUserData(id);
        loadForos(id);
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

    const loadForos = async (id) => {
        setLoading(true);
        try {
            const [forosResult, misForosResult] = await Promise.all([
                getForos(),
                getForosByUsuario(id)
            ]);
            
            if (forosResult.success) {
                setForos(forosResult.data);
            }
            
            if (misForosResult.success) {
                setMisForos(misForosResult.data);
            }
        } catch (error) {
            console.error("Error cargando foros:", error);
        }
        setLoading(false);
    };

    const handleBack = () => {
        if (userRole === 'profesor') {
            navigate('/view-teachers');
        } else {
            navigate('/view-students');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateForo = async () => {
        if (!formData.titulo) {
            alert('Por favor ingresa un título para el foro');
            return;
        }

        const foroData = {
            titulo: formData.titulo,
            descripcion: formData.descripcion || '',
            categoria: formData.categoria,
            creadorId: userId,
            creadorNombre: userName
        };

        const result = await createForo(foroData);
        
        if (result.success) {
            alert('Foro creado exitosamente');
            setFormData({ titulo: '', descripcion: '', categoria: 'general' });
            loadForos(userId);
        } else {
            alert('Error al crear el foro: ' + result.error);
        }
    };

    const handleSelectForo = (foro) => {
        setSelectedForo(foro);
    };

    const handleSendMensaje = async () => {
        if (!mensaje.trim() || !selectedForo) return;

        const mensajeData = {
            userId: userId,
            userName: userName,
            texto: mensaje
        };

        const result = await addMensaje(selectedForo.id, mensajeData);
        
        if (result.success) {
            setMensaje('');
            // Actualizar el foro seleccionado
            const updatedForo = {
                ...selectedForo,
                mensajes: [...(selectedForo.mensajes || []), result.mensaje]
            };
            setSelectedForo(updatedForo);
            loadForos(userId);
        } else {
            alert('Error al enviar mensaje: ' + result.error);
        }
    };

    const handleDeleteForo = async (foroId) => {
        if (window.confirm('¿Estás seguro de eliminar este foro?')) {
            const result = await deleteForo(foroId);
            if (result.success) {
                alert('Foro eliminado');
                setSelectedForo(null);
                loadForos(userId);
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const filteredForos = (showMyForos ? misForos : foros).filter(foro =>
        foro.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        foro.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        });
    };

    return(
        <div className={Style.body_foro}>
            {/* Botón de regreso */}
            <button className={Style.backButton} onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Volver
            </button>

            <div className={Style.chat_container}>
                {/* Sidebar de foros */}
                <div className={Style.sidebar}>
                    <div className={Style.sidebar_header}>
                        <h2>💬 NEXUS FOROS</h2>
                        <p>Comunidad de aprendizaje</p>
                    </div>

                    <div className={Style.search_box}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Buscar foros..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Solo profesores pueden crear foros */}
                    {userRole === 'profesor' && (
                        <div className={Style.create_forum}>
                            <h3>Crear Nuevo Foro</h3>
                            <input
                                type="text"
                                name="titulo"
                                placeholder="Nombre del foro"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            
                            <textarea
                                name="descripcion"
                                placeholder="Descripción (opcional)"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                rows="2"
                            />
                            
                            <select 
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleInputChange}
                            >
                                <option value="general">📌 General</option>
                                <option value="ayuda">🆘 Ayuda</option>
                                <option value="proyecto">💼 Proyectos</option>
                                <option value="anuncio">📢 Anuncios</option>
                            </select>
                            
                            <button 
                                className={Style.create_button} 
                                onClick={handleCreateForo}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Crear Foro
                            </button>
                        </div>
                    )}

                    <div className={Style.forums_section}>
                        <button 
                            className={Style.my_forums_button}
                            onClick={() => setShowMyForos(!showMyForos)}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            {showMyForos ? 'Todos los Foros' : 'Mis Foros'}
                        </button>

                        <div className={Style.forums_list}>
                            {loading ? (
                                <div className={Style.empty_state}>
                                    <p>Cargando foros...</p>
                                </div>
                            ) : filteredForos.length === 0 ? (
                                <div className={Style.empty_state}>
                                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#ccc" strokeWidth="2"/>
                                    </svg>
                                    <p>No hay foros disponibles</p>
                                </div>
                            ) : (
                                filteredForos.map((foro) => (
                                    <div 
                                        key={foro.id}
                                        className={`${Style.forum_item} ${selectedForo?.id === foro.id ? Style.active : ''}`}
                                        onClick={() => handleSelectForo(foro)}
                                    >
                                        <div className={Style.forum_icon}>
                                            {foro.categoria === 'ayuda' && '🆘'}
                                            {foro.categoria === 'proyecto' && '💼'}
                                            {foro.categoria === 'anuncio' && '📢'}
                                            {foro.categoria === 'general' && '📌'}
                                        </div>
                                        <div className={Style.forum_info}>
                                            <h4>{foro.titulo}</h4>
                                            <p>{foro.descripcion?.substring(0, 30)}{foro.descripcion?.length > 30 && '...'}</p>
                                            <small>Por: {foro.creadorNombre}</small>
                                        </div>
                                        <div className={Style.forum_meta}>
                                            <span>{foro.mensajes?.length || 0}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat box */}
                <div className={Style.chat_box}>
                    {selectedForo ? (
                        <>
                            <div className={Style.header}>
                                <div className={Style.profile_pic_wrapper}>
                                    <div className={Style.forum_icon_large}>
                                        {selectedForo.categoria === 'ayuda' && '🆘'}
                                        {selectedForo.categoria === 'proyecto' && '💼'}
                                        {selectedForo.categoria === 'anuncio' && '📢'}
                                        {selectedForo.categoria === 'general' && '📌'}
                                    </div>
                                </div>
                                <div className={Style.forum_title}>
                                    <div className={Style.forum_name}>{selectedForo.titulo}</div>
                                    <div className={Style.forum_status}>
                                        <span className={Style.status_dot}></span>
                                        {selectedForo.participantes?.length || 0} participantes
                                    </div>
                                </div>
                                {userRole === 'profesor' && selectedForo.creadorId === userId && (
                                    <button 
                                        className={Style.delete_button}
                                        onClick={() => handleDeleteForo(selectedForo.id)}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        Eliminar Foro
                                    </button>
                                )}
                            </div>

                            <div className={Style.messages}>
                                {selectedForo.mensajes && selectedForo.mensajes.length > 0 ? (
                                    selectedForo.mensajes.map((msg, index) => (
                                        <div 
                                            key={msg.id || index}
                                            className={`${Style.message} ${msg.userId === userId ? Style.sent : Style.received}`}
                                        >
                                            <div className={Style.message_content}>
                                                <div className={Style.message_header}>
                                                    <strong>{msg.userName}</strong>
                                                    <span className={Style.message_time}>
                                                        {formatTime(msg.timestamp)}
                                                    </span>
                                                </div>
                                                <p>{msg.texto}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={Style.welcome_message}>
                                        <div className={Style.welcome_icon}>
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#ccc" strokeWidth="2"/>
                                            </svg>
                                        </div>
                                        <h3>¡Inicia la conversación!</h3>
                                        <p>Sé el primero en escribir en este foro</p>
                                    </div>
                                )}
                            </div>

                            <div className={Style.input_box}>
                                <input
                                    type="text"
                                    placeholder="Escribe tu mensaje..."
                                    value={mensaje}
                                    onChange={(e) => setMensaje(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMensaje()}
                                />
                                <button 
                                    className={Style.send_button}
                                    onClick={handleSendMensaje}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={Style.welcome_message}>
                            <div className={Style.welcome_icon}>
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#667eea" strokeWidth="2"/>
                                </svg>
                            </div>
                            <h3>Selecciona un foro</h3>
                            <p>Elige un foro de la lista para comenzar a participar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Foro;

