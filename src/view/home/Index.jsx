import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Style from "./index.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Dev} from "../../components/indexC";

function Index (){
    useEffect(() => {
        AOS.init({
          duration: 1300, // Duración de la animación (en milisegundos)
        });
      }, []);
   
    const navigate = useNavigate(); 

   
    return(
        
        <>
        <div className={Style.body}>
        <header className={Style.header}>
            <a  href="/" className={Style.logo}>Nexus</a>
    
            <nav className={Style.nav}>
                <a className={Style.a_index} href="#">daniel</a>
                <a className={Style.a_index} href="#">steve</a>
                <a className={Style.a_index} href="#">salazar</a>
                <a className={Style.a_index} href="#">sebastian</a>
                <a className={Style.a_index} href="#dev">Group</a>
                <a className={Style.a_index} href="#footer">Contáctanos</a>
                <button className={Style.btn1}  onClick={()=> navigate('/register-form')}>Registrarse</button>
                <button className={Style.btn1}  onClick={()=> navigate('/login-form')}>Iniciar sesión</button>
            </nav>
        </header>

        <section className={Style.hero}>
            <div className={Style.hero_overlay}></div>
            <div className={Style.hero_content}>
                <h2 className={Style.h2_index} >Innovación y Conexión en la Educación</h2>
                <p className={Style.p_index}>Con Nexus, revoluciona el aprendizaje con tecnología avanzada e interacción auténtica.</p>
                <a  href="#learn_more" className={`${Style.btn} ${Style.btn_learn_more}`}>Descubre Más</a>
            </div>
        </section>
        
        <Dev/>
            

        <section className={Style.about}  >
            <div className={Style.container} id='learn_more'>
                <h2 className={Style.h2_index}>¿Qué es Nexus?</h2>
                <p className={Style.p_index}>Nexus es una plataforma avanzada de aprendizaje en línea, diseñada para transformar la educación a través de herramientas innovadoras y una asistencia impulsada por IA.</p>
                <div className={`${Style.features}`}>
                    <div className={`${Style.features} ${Style.learn_more}`}>
                        <h3 className={Style.h3_index}>Tiempo Real</h3>
                        <p className={Style.p_index}>Accede a clases, recursos y una red de expertos en educación.</p>
                    </div>
                    <div className={`${Style.features} ${Style.learn_more}`}>
                        <h3 className={Style.h3_index}>Asistencia Inteligente</h3>
                        <p className={Style.p_index}>IA diseñada para ayudar en la toma de decisiones y apoyar el aprendizaje.</p>
                    </div>
                    <div className={`${Style.features} ${Style.learn_more}`}>
                        <h3 className={Style.h3_index}>Recursos Exclusivos</h3>
                        <p className={Style.p_index}>Accede a una biblioteca digital personalizada y materiales premium.</p>
                    </div>
                </div>
            </div>
        </section>

        <footer className={Style.footer}>
            <div className={Style.container}>
                <p className={Style.p_index}>&copy; 2024 Nexus. Todos los derechos reservados.</p>
            </div>
        </footer>
        </div>
        </>
    );
};
export default Index;
