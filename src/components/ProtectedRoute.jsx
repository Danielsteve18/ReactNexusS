import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole, allowNoRole = false }) => {
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');

    // Si no hay usuario autenticado, redirigir a login
    if (!userId) {
        return <Navigate to="/login-form" replace />;
    }

    // Si la ruta permite no tener rol (como /view-rol), mostrar el contenido
    if (allowNoRole && !userRole) {
        return children;
    }

    // Si no hay rol asignado y la ruta no permite estar sin rol, redirigir a selección de rol
    if (!userRole) {
        return <Navigate to="/view-rol" replace />;
    }

    // Si hay un rol requerido y no coincide, redirigir según el rol del usuario
    if (requiredRole && userRole !== requiredRole) {
        if (userRole === "profesor") {
            return <Navigate to="/view-teachers" replace />;
        } else if (userRole === "student") {
            return <Navigate to="/view-students" replace />;
        }
    }

    // Si todo está bien, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;
