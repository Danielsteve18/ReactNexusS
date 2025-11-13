import { useState, useEffect } from "react";
import Style from "./shared.module.css";
import { Barra_Left } from "../../../components/indexC";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

function Activity() {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    const menuItems = userRole === 'profesor' ? [
        { href: "/view-foro", content: "Foros" },
        { href: "/view-config", content: "Configuraciones" },
        { href: "/view-activity", content: "Actividad" },
        { href: "/view-convocatorias", content: "Convocatorias" },
        { href: "/clean-convocatorias", content: "Limpiar Datos" },
        { href: "/view-aVirtual", content: "Aula Virtual" },
    ] : [
        { href: "/view-new-course", content: "Nuevo Curso" },
        { href: "/view-foro", content: "Foros" },
        { href: "/view-config", content: "Configuraciones" },
        { href: "/view-activity", content: "Actividad" },
        { href: "/view-convocatorias", content: "Convocatorias" },
    ];

    return (
        <div className={Style.container}>
            <Barra_Left items={menuItems} />
            
            <div className={Style.content}>
                <div className={Style.header}>
                    <h1>📊 Actividad</h1>
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

                    <div className={Style.statsGrid}>
                        <div className={Style.statBox}>
                            <span className={Style.statNumber}>0</span>
                            <span className={Style.statLabel}>Acciones hoy</span>
                        </div>
                        <div className={Style.statBox}>
                            <span className={Style.statNumber}>0</span>
                            <span className={Style.statLabel}>Esta semana</span>
                        </div>
                        <div className={Style.statBox}>
                            <span className={Style.statNumber}>0</span>
                            <span className={Style.statLabel}>Este mes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Activity;
