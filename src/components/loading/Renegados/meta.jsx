import Style from "./meta.module.css";
import { useRef } from "react";

export const Barra_Left = props => {

    const sidebarRef = useRef(null);
    
    const click = () => { console.log("Salir salon");
        if (sidebarRef.current) {
            sidebarRef.current.classList.toggle(Style.active);
           
        } else {
            console.error("El elemento 'sidebar' no está disponible.");
        }
    };
    
    return(
        <div  ref={sidebarRef} className={Style.sidebar}>
           
            <div className={Style.logo_content}>
                <div className={Style.logo}>
                <button id="sidebar" onClick={click} className={Style.button_b}>
                    <div className={Style.svg_barraLateral}>
                    <svg 
                    className="w-6 h-6 text-gray-800 dark:text-white" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="none" 
                    viewBox="0 0 24 24">

                    <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeWidth="2" 
                    d="M5 7h14M5 12h14M5 17h10"/>
                    </svg>
                    </div>
                </button>
                </div>
            </div>
            <ul className={`${Style.nav_list} ${Style.ul}`}>
                <li className={Style.item_barraLeft}>
                <a className={Style.a} href={props.href}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                            <img className={Style.svg_B} src={props.img_content} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
                <a className={Style.a}href={props.hrf_1}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                        <img className={Style.svg_B} src={props.img_1} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content1}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
                <a className={Style.a}href={props.href_2}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                            <img className={Style.svg_B} src={props.img_2} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content2}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
                <a className={Style.a}href={props.href_3}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                            <img className={Style.svg_B} src={props.img_3} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content3}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
               <a className={Style.a}href={props.href_4}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                            <img className={Style.svg_B} src={props.img_4} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content4}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
                <a className={Style.a}href={props.href_5}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                            <img className={Style.svg_B} src={props.img_5} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content5}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
                <a className={Style.a}href={props.href_6}>
                    <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                        <i>
                            <img className={Style.svg_B} src={props.img_6} alt="" />
                        </i>
                        <p className={Style.name_barraleft}>{props.content6}</p>
                    </div>
                    </div>
                </a>
                </li>
                <li className={Style.item_barraLeft}>
                <div className={Style.logo_content_barraleft}>
                    <div className={Style.logo}>
                    <ion-icon name="moon-outline" />
                    <p className={Style.name_barraleft}>Dark Mode</p>
                    <button id="darkmode" type="checkbox" />
                    </div>
                </div>
                </li>
                {/* Añadir más elementos de la barra lateral según sea necesario */}
            </ul>
        </div>

    )
};


export default Barra_Left;