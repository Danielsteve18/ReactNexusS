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
                <a className={Style.a_index} href="#features">Tìpicos</a>
                <a className={Style.a_index} href="#how-it-works">Cómo Funciona</a>
                <a className={Style.a_index} href="#testimonials">Testimonios</a>
            
                <a className={Style.a_index} href="#dev">Equipo</a>
                <a className={Style.a_index} href="https://danielsteve18.github.io/Portafolio/" >Contacto</a>
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

        <section className={Style.features_section} id="features">
            <div className={Style.container}>
                <h2 className={Style.h2_index} data-aos="fade-up">Características Principales</h2>
                <div className={Style.features_grid}>
                    <div className={Style.feature_card} data-aos="fade-up" data-aos-delay="100">
                        <div className={Style.feature_icon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <h3 className={Style.h3_index}>Comunidad Activa</h3>
                        <p className={Style.p_index}>Conecta con miles de estudiantes y profesores en todo el mundo</p>
                    </div>
                    
                    <div className={Style.feature_card} data-aos="fade-up" data-aos-delay="200">
                        <div className={Style.feature_icon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                            </svg>
                        </div>
                        <h3 className={Style.h3_index}>Cursos Certificados</h3>
                        <p className={Style.p_index}>Obtén certificados reconocidos al completar tus cursos</p>
                    </div>
                    
                    <div className={Style.feature_card} data-aos="fade-up" data-aos-delay="300">
                        <div className={Style.feature_icon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <h3 className={Style.h3_index}>Aprende a tu Ritmo</h3>
                        <p className={Style.p_index}>Acceso 24/7 a todo el contenido desde cualquier dispositivo</p>
                    </div>
                    
                    <div className={Style.feature_card} data-aos="fade-up" data-aos-delay="400">
                        <div className={Style.feature_icon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                <line x1="12" y1="22.08" x2="12" y2="12"/>
                            </svg>
                        </div>
                        <h3 className={Style.h3_index}>Contenido Premium</h3>
                        <p className={Style.p_index}>Material exclusivo creado por expertos en cada área</p>
                    </div>
                </div>
            </div>
        </section>

        <section className={Style.how_it_works} id="how-it-works">
            <div className={Style.container}>
                <h2 className={Style.h2_index} data-aos="fade-up">¿Cómo Funciona?</h2>
                <div className={Style.steps_container}>
                    <div className={Style.step} data-aos="fade-right">
                        <div className={Style.step_number}>1</div>
                        <h3 className={Style.h3_index}>Regístrate</h3>
                        <p className={Style.p_index}>Crea tu cuenta gratis en menos de 2 minutos</p>
                    </div>
                    
                    <div className={Style.step} data-aos="fade-right" data-aos-delay="100">
                        <div className={Style.step_number}>2</div>
                        <h3 className={Style.h3_index}>Elige tu Rol</h3>
                        <p className={Style.p_index}>Selecciona si eres estudiante o profesor</p>
                    </div>
                    
                    <div className={Style.step} data-aos="fade-right" data-aos-delay="200">
                        <div className={Style.step_number}>3</div>
                        <h3 className={Style.h3_index}>Explora Cursos</h3>
                        <p className={Style.p_index}>Descubre miles de cursos en diferentes categorías</p>
                    </div>
                    
                    <div className={Style.step} data-aos="fade-right" data-aos-delay="300">
                        <div className={Style.step_number}>4</div>
                        <h3 className={Style.h3_index}>Comienza a Aprender</h3>
                        <p className={Style.p_index}>Accede al contenido y obtén tu certificado</p>
                    </div>
                </div>
            </div>
        </section>

        <section className={Style.testimonials} id="testimonials">
            <div className={Style.container}>
                <h2 className={Style.h2_index} data-aos="fade-up">Lo que Dicen Nuestros Usuarios</h2>
                <div className={Style.testimonials_grid}>
                    <div className={Style.testimonial_card} data-aos="zoom-in">
                        <div className={Style.user_avatar}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <p className={Style.p_index}>"Nexus ha transformado mi forma de enseñar. Mis estudiantes están más comprometidos que nunca."</p>
                        <h4 className={Style.h3_index}>María García</h4>
                        <span className={Style.user_role}>Profesora de Matemáticas</span>
                    </div>
                    
                    <div className={Style.testimonial_card} data-aos="zoom-in" data-aos-delay="100">
                        <div className={Style.user_avatar}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <p className={Style.p_index}>"La mejor plataforma de aprendizaje que he usado. Los cursos son excelentes y muy completos."</p>
                        <h4 className={Style.h3_index}>Carlos Rodríguez</h4>
                        <span className={Style.user_role}>Estudiante de Programación</span>
                    </div>
                    
                    <div className={Style.testimonial_card} data-aos="zoom-in" data-aos-delay="200">
                        <div className={Style.user_avatar}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <p className={Style.p_index}>"Increíble sistema de seguimiento. Puedo ver el progreso de cada estudiante en tiempo real."</p>
                        <h4 className={Style.h3_index}>Ana López</h4>
                        <span className={Style.user_role}>Profesora de Diseño</span>
                    </div>
                </div>
            </div>
        </section>

        <section className={Style.cta_section}>
            <div className={Style.container}>
                <div className={Style.cta_content} data-aos="fade-up">
                    <h2 className={Style.h2_index}>¿Listo para Comenzar?</h2>
                    <p className={Style.p_index}>Únete a miles de estudiantes y profesores que ya están transformando la educación</p>
                    <div className={Style.cta_buttons}>
                        <button className={Style.btn} onClick={()=> navigate('/register-form')}>
                            Comenzar Gratis
                        </button>
                        <button className={`${Style.btn} ${Style.btn_secondary}`} onClick={()=> navigate('/login-form')}>
                            Iniciar Sesión
                        </button>
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
