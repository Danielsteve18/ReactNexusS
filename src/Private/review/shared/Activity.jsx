import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { profesorMenuItems, studentMenuItems } from '../../../utils/menuItems';
import { getCursosByEstudiante } from '../../../firebase/services/cursos';

function Activity() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');
    const [tareasPendientes, setTareasPendientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const id = localStorage.getItem('userId');
        setUserRole(role);
        setUserId(id);

        if (role === 'student' && id) {
            loadTareasPendientes(id);
        } else {
            setLoading(false);
        }
    }, []);

    const loadTareasPendientes = async (estudianteId) => {
        setLoading(true);
        try {
            const result = await getCursosByEstudiante(estudianteId);
            if (result.success) {
                // Recolectar todas las tareas pendientes de todos los cursos
                const tareas = [];
                result.data.forEach(curso => {
                    if (curso.modulos && Array.isArray(curso.modulos)) {
                        curso.modulos.forEach(modulo => {
                            if (modulo.lecciones && Array.isArray(modulo.lecciones)) {
                                modulo.lecciones.forEach(leccion => {
                                    if (leccion.tipo === 'tarea') {
                                        // Verificar si el estudiante ya completó la tarea
                                        const entrega = leccion.entregas?.find(e => e.estudianteId === estudianteId);
                                        const estaCalificada = entrega?.estado === 'calificada';
                                        
                                        if (!estaCalificada) {
                                            tareas.push({
                                                ...leccion,
                                                cursoId: curso.id,
                                                cursoTitulo: curso.titulo,
                                                moduloTitulo: modulo.titulo,
                                                entregado: !!entrega,
                                                estadoEntrega: entrega?.estado || 'no-entregada'
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });

                // Ordenar por fecha de entrega
                tareas.sort((a, b) => {
                    if (!a.fechaEntrega) return 1;
                    if (!b.fechaEntrega) return -1;
                    return new Date(a.fechaEntrega) - new Date(b.fechaEntrega);
                });

                setTareasPendientes(tareas);
            }
        } catch (error) {
            console.error("Error cargando tareas:", error);
        }
        setLoading(false);
    };

    const getDiasRestantes = (fechaEntrega) => {
        if (!fechaEntrega) return null;
        const hoy = new Date();
        const fecha = new Date(fechaEntrega);
        const diffTime = fecha - hoy;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getEstadoColor = (estadoEntrega, diasRestantes) => {
        if (estadoEntrega === 'pendiente') return '#f59e0b';
        if (diasRestantes === null) return '#6b7280';
        if (diasRestantes < 0) return '#ef4444';
        if (diasRestantes <= 2) return '#f59e0b';
        return '#10b981';
    };

    const getEstadoTexto = (estadoEntrega, diasRestantes) => {
        if (estadoEntrega === 'pendiente') return 'En revisión';
        if (diasRestantes === null) return 'Sin fecha límite';
        if (diasRestantes < 0) return `Vencida (${Math.abs(diasRestantes)} días)`;
        if (diasRestantes === 0) return 'Vence hoy';
        if (diasRestantes === 1) return 'Vence mañana';
        return `${diasRestantes} días restantes`;
    };

    const handleIrATarea = (tarea) => {
        navigate(`/detalle-curso/${tarea.cursoId}`);
    };

    const menuItems = userRole === 'profesor' ? profesorMenuItems : studentMenuItems;

    // Vista para profesores (sin cambios)
    if (userRole !== 'student') {
        return (
            <div className={Style.container}>
                <Barra_Left items={menuItems} />
                
                <div className={Style.content}>
                    <div className={Style.header}>
                        <h1>Actividad</h1>
                        <p>Revisa tu actividad reciente en la plataforma</p>
                    </div>

                    <div className={Style.activitySection}>
                        <div className={Style.activityCard}>
                            <div className={Style.iconBox}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="#1e88e5" strokeWidth="2"/>
                                </svg>
                            </div>
                            <h3>Actividad Reciente</h3>
                            <div className={Style.activityList}>
                                <div className={Style.emptyState}>
                                    <p>No hay actividad reciente para mostrar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Vista para estudiantes con tareas pendientes
    return (
        <div className={Style.container}>
            <Barra_Left items={menuItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>Mis Actividades Pendientes</h1>
                    <p>Tareas que aún no has completado</p>
                </div>

                {loading ? (
                    <div className={Style.loadingState}>
                        <div className={Style.spinner}></div>
                        <p>Cargando actividades...</p>
                    </div>
                ) : tareasPendientes.length === 0 ? (
                    <div className={Style.emptyState}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ margin: '20px auto', display: 'block' }}>
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#10b981" strokeWidth="2"/>
                        </svg>
                        <h3 style={{ color: '#10b981', marginBottom: '8px' }}>¡Todo al día!</h3>
                        <p>No tienes tareas pendientes en este momento</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{
                            background: '#f0f9ff',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #bfdbfe'
                        }}>
                            <strong style={{ color: '#1e40af' }}>
                                {tareasPendientes.length} {tareasPendientes.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}
                            </strong>
                        </div>

                        {tareasPendientes.map((tarea, index) => {
                            const diasRestantes = getDiasRestantes(tarea.fechaEntrega);
                            const estadoColor = getEstadoColor(tarea.estadoEntrega, diasRestantes);
                            const estadoTexto = getEstadoTexto(tarea.estadoEntrega, diasRestantes);

                            return (
                                <div 
                                    key={index}
                                    style={{
                                        background: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderLeft: `4px solid ${estadoColor}`,
                                        borderRadius: '8px',
                                        padding: '20px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }}
                                    onClick={() => handleIrATarea(tarea)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: '0 0 8px 0', color: '#111827', fontSize: '1.1rem' }}>
                                                {tarea.titulo}
                                            </h3>
                                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                                                <span style={{
                                                    background: '#f3f4f6',
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.85rem',
                                                    color: '#4b5563'
                                                }}>
                                                    {tarea.cursoTitulo}
                                                </span>
                                                <span style={{
                                                    background: '#ede9fe',
                                                    padding: '4px 12px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.85rem',
                                                    color: '#6b21a8'
                                                }}>
                                                    {tarea.moduloTitulo}
                                                </span>
                                            </div>
                                        </div>
                                        <span style={{
                                            background: estadoColor,
                                            color: 'white',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {estadoTexto}
                                        </span>
                                    </div>

                                    {tarea.descripcion && (
                                        <p style={{ 
                                            color: '#6b7280', 
                                            margin: '0 0 12px 0',
                                            fontSize: '0.95rem'
                                        }}>
                                            {tarea.descripcion.substring(0, 150)}
                                            {tarea.descripcion.length > 150 && '...'}
                                        </p>
                                    )}

                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        paddingTop: '12px',
                                        borderTop: '1px solid #f3f4f6'
                                    }}>
                                        <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: '#6b7280' }}>
                                            {tarea.puntos && (
                                                <span>Puntos: {tarea.puntos}</span>
                                            )}
                                            {tarea.fechaEntrega && (
                                                <span>
                                                    Fecha límite: {new Date(tarea.fechaEntrega).toLocaleDateString('es-ES')}
                                                </span>
                                            )}
                                        </div>
                                        {tarea.entregado && (
                                            <span style={{
                                                background: '#fef3c7',
                                                color: '#92400e',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500'
                                            }}>
                                                Entregada - En revisión
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Activity;
