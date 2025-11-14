import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { checkProfileComplete } from '../../firebase/services/users';
import Style from './notification.module.css';

function ProfileNotification() {
    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Rutas públicas donde NO debe aparecer la notificación
        const excludedRoutes = ['/', '/login-form', '/register-form', '/view-rol'];
        
        // Rutas privadas conocidas (para detectar 404)
        const knownPrivateRoutes = [
            '/view-students', '/view-teachers', '/view-foro', '/aula-virtual',
            '/view-config', '/view-activity', '/view-convocatorias', 
            '/view-new-course', '/view-cursos', '/clean-convocatorias', '/tester'
        ];
        
        const currentPath = location.pathname;
        
        // Si estamos en una ruta excluida, no mostrar notificación
        if (excludedRoutes.includes(currentPath)) {
            setShow(false);
            return;
        }
        
        // Si es una ruta desconocida (404), no mostrar notificación
        const isKnownRoute = knownPrivateRoutes.some(route => 
            currentPath === route || currentPath.startsWith('/detalle-curso/')
        );
        
        if (!isKnownRoute) {
            setShow(false);
            return;
        }

        // Solo verificar si hay un usuario autenticado
        const userId = localStorage.getItem('userId');
        if (userId) {
            checkProfile();
        }
    }, [location.pathname]);

    const checkProfile = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        // Verificar si ya fue descartada en esta sesión
        const wasDismissed = sessionStorage.getItem('profileNotificationDismissed');
        if (wasDismissed) {
            setDismissed(true);
            return;
        }

        const result = await checkProfileComplete(userId);
        if (!result.complete && result.missing.length > 0) {
            setMissingFields(result.missing);
            setShow(true);
        }
    };

    const handleDismiss = () => {
        setShow(false);
        setDismissed(true);
        sessionStorage.setItem('profileNotificationDismissed', 'true');
    };

    const handleGoToProfile = () => {
        navigate('/view-config');
        setShow(false);
    };

    const getFieldLabel = (field) => {
        const labels = {
            'name': 'Nombre completo',
            'telefono': 'Teléfono',
            'bio': 'Biografía / Descripción'
        };
        return labels[field] || field;
    };

    if (!show || dismissed) return null;

    return (
        <div className={Style.notificationBanner}>
            <div className={Style.notificationContent}>
                <div className={Style.iconContainer}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="12" cy="16" r="1" fill="currentColor"/>
                    </svg>
                </div>
                <div className={Style.textContainer}>
                    <h4>¡Completa tu perfil!</h4>
                    <p>
                        Te faltan {missingFields.length} datos importantes: {' '}
                        <strong>{missingFields.map(getFieldLabel).join(', ')}</strong>
                    </p>
                </div>
                <div className={Style.actions}>
                    <button 
                        className={Style.primaryButton}
                        onClick={handleGoToProfile}
                    >
                        Completar ahora
                    </button>
                    <button 
                        className={Style.dismissButton}
                        onClick={handleDismiss}
                    >
                        Más tarde
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfileNotification;
