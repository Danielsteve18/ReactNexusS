import { useState, useEffect } from "react";
import Style from "../student/students.module.css";
import {Barra_Left} from "../../../components/indexC";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { studentMenuItems } from '../../../utils/menuItems';
   
function Estudents(){
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

    return (
        <div className={Style.bodyEstudents}>
            <Barra_Left items={studentMenuItems}/>
            
            {/* Hero Section con Bienvenida */}
            <div className={Style.heroSection}>
                <div className={Style.welcomeCard}>
                    <img 
                        src="https://via.placeholder.com/120" 
                        alt="Foto de perfil" 
                        className={Style.profile_picE}
                    />
                    <div className={Style.welcomeText}>
                        <h1 className={Style.h1_students}>
                            <span className={Style.bienvenidoE}>BIENVENIDO A NEXUS</span>
                        </h1>
                        <p className={Style.userName}>{userName}</p>
                        <div className={Style.rolBadge}>
                            <span>👨‍🎓 Estudiante</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de Información sobre Nexus */}
            <div className={Style.aboutNexus}>
                <div className={Style.infoCard}>
                    <div className={Style.iconBox}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" stroke="#1e88e5" strokeWidth="2"/>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" stroke="#1e88e5" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h3>Plataforma Educativa</h3>
                    <p>Nexus es tu espacio de aprendizaje interactivo donde puedes acceder a cursos, participar en foros y completar talleres.</p>
                </div>
                
                <div className={Style.infoCard}>
                    <div className={Style.iconBox}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="#1e88e5" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h3>Colaboración</h3>
                    <p>Conecta con compañeros y profesores a través de foros de discusión y sesiones virtuales.</p>
                </div>
                
                <div className={Style.infoCard}>
                    <div className={Style.iconBox}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke="#1e88e5" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h3>Seguimiento</h3>
                    <p>Monitorea tu progreso académico y mantente al día con tus tareas y talleres pendientes.</p>
                </div>
            </div>

            {/* Secciones principales */}
            <div className={Style.mainContent}>
                <div className={Style.Tsudents}>
                    <h2>📚 Talleres Pendientes</h2>
                    <div id="pendingWorkshops" className={Style.workshopsList}>
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>No tienes talleres pendientes</p>
                        </div>
                    </div>
                </div>

                <div className={Style.Courses_students}>
                    <h2>🎓 Mis Cursos</h2>
                    <div id="coursesList" className={Style.coursesList}>
                        <div className={Style.emptyState}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#ccc" strokeWidth="2"/>
                            </svg>
                            <p>Aún no estás inscrito en ningún curso</p>
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
                    <span className={Style.statLabel}>Talleres Completados</span>
                </div>
                <div className={Style.statCard}>
                    <span className={Style.statNumber}>0</span>
                    <span className={Style.statLabel}>Participaciones en Foros</span>
                </div>
            </div>
        </div>
    );
}

export default Estudents
