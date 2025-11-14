import { useState, useEffect } from "react";
import Style from "./teacher.module.css";
import {Barra_Left} from "../../../components/indexC";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { profesorMenuItems } from '../../../utils/menuItems';

function Teachers () {
    const [userName, setUserName] = useState('Cargando...');

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const userRef = doc(db, "users", userId);
                    const userDoc = await getDoc(userRef);
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserName(userData.name || userData.email || 'Usuario');
                    } else {
                        setUserName('Usuario');
                    }
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                    setUserName('Usuario');
                }
            } else {
                setUserName('Usuario');
            }
        };
        
        fetchUserData();
    }, []);
    
    return(
        <div className={Style.bodyTeachers}>
            <Barra_Left items={profesorMenuItems}/>
            
            {/* Hero Section con Bienvenida */}
            <div className={Style.heroSection}>
                <div className={Style.welcomeCard}>
                    <img
                        src="https://via.placeholder.com/120"
                        alt="Foto de perfil"
                        className={Style.profile_pic}
                    />
                    <div className={Style.welcomeText}>
                        <h1 className={Style.h1_teachers}>
                            <span className={Style.bienvenido}>BIENVENIDO A NEXUS</span>
                        </h1>
                        <p className={Style.userName}>{userName}</p>
                        <div className={Style.rolBadge}>
                            <span>👨‍🏫 Profesor</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Información sobre Nexus para Profesores */}
            <div className={Style.aboutNexus}>
                <div className={Style.infoCard}>
                    <div className={Style.iconBox}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="#1e88e5" strokeWidth="2"/>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="#1e88e5" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h3>Gestión de Cursos</h3>
                    <p>Crea y administra tus cursos, asigna tareas y evalúa el progreso de tus estudiantes de manera eficiente.</p>
                </div>
                
                <div className={Style.infoCard}>
                    <div className={Style.iconBox}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke="#1e88e5" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h3>Interacción Directa</h3>
                    <p>Mantén comunicación constante con tus estudiantes mediante foros, aulas virtuales y convocatorias.</p>
                </div>
                
                <div className={Style.infoCard}>
                    <div className={Style.iconBox}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="#1e88e5" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h3>Herramientas Educativas</h3>
                    <p>Accede a un conjunto completo de herramientas para crear contenido educativo de calidad y evaluar efectivamente.</p>
                </div>
            </div>

            {/* Secciones principales */}
            <div className={Style.mainContent}>
                <div className={Style.CursosD}>
                    <h2>🎓 Mis Cursos</h2>
                    <div id="coursesList" className={Style.coursesList}>
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>Aún no has creado ningún curso</p>
                            <button className={Style.createBtn}>Crear Nuevo Curso</button>
                        </div>
                    </div>
                </div>

                <div className={Style.convocatorias}>
                    <h2>📢 Convocatorias Activas</h2>
                    <div className={Style.convocatoriasList}>
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>No hay convocatorias activas</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className={Style.quickStats}>
                <div className={Style.statCard}>
                    <span className={Style.statNumber}>0</span>
                    <span className={Style.statLabel}>Cursos Activos</span>
                </div>
                <div className={Style.statCard}>
                    <span className={Style.statNumber}>0</span>
                    <span className={Style.statLabel}>Estudiantes Totales</span>
                </div>
                <div className={Style.statCard}>
                    <span className={Style.statNumber}>0</span>
                    <span className={Style.statLabel}>Tareas Pendientes</span>
                </div>
            </div>
        </div>
    )
};

export default Teachers