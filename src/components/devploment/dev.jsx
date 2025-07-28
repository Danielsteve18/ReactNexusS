import Style from './dev.module.css';
function Dev()  {
    return (
    <section id='dev' className={Style.C_devp}>
        <div  className={Style.devpONE}>
            <div className={Style.devNames}> 
                <h1 className={Style.S}>J.S SALAZAR</h1>
                <h1 className={Style.D}>D.S MONTAÑO</h1>
            </div>
            <div className={Style.C_sd}>
                <div className={Style.Salazar}>
                    <div className={Style.dev_center}>
                        <img data-aos="fade-down-right" data-aos-once="true" className={Style.img_dev} src="public\vite.svg" alt="" />
                         <h2 className={Style.h2_dev}>Back End and <span className={Style.span_dev}>Fron End</span></h2>
                    </div>    
                            <p className={Style.p_dev}> Soy un desarrollador backend que domina la lógica, 
                                        las APIs y el manejo de datos, 
                                        pero también puedo hacer un toque de frontend cuando es necesario. 
                                        Aunque me enfoco en la base sólida que mantiene todo funcionando, 
                                        ese conocimiento de frontend me permite colaborar mejor con mis compañeros y 
                                        hacer ajustes sencillos cuando la ocasión lo amerita. 
                                        ¡soy una pieza clave que mantiene todo en marcha! 🚀
                            </p>
                </div>
                <div className={Style.Montaño}>
                    <div className={Style.dev_center}>
                        <img data-aos="fade-down-left" data-aos-once="true" className={Style.img_dev} src="public\vite.svg" alt="" />
                            <h2 className={Style.h2_dev}>Front End and <span className={Style.span_dev}>Back End</span></h2>
                    </div>    
                            <p className={Style.p_dev}>
                                    Como desarrollador frontend, estoy enfocado en crear interfaces de usuario intuitivas y 
                                    atractivas, dando vida al diseño y asegurándote de que la experiencia del usuario sea 
                                    impecable. Aunque conozco poco de backend, el simple hecho de tener algo de conocimiento en
                                    esa área me permite entender mejor cómo se conecta tu trabajo con la lógica y la estructura
                                    detrás del sistema. Esa combinación me hace un puente esencial entre el diseño visual y 
                                    el funcionamiento de nuestras aplicaciones. 💻✨
                            </p>
                                
                </div>

            </div>
        </div>
    </section>
    );
}

export default Dev