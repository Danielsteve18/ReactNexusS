import { useRef, useState } from "react";
import Style from "./meta.module.css";

const Barra_Left = (props) => {
  const sidebarRef = useRef(null);

  const click = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle(Style.active);
    } else {
      console.error("El sidebar no está disponible.");
    }
  };

  const navItems = [
    {
      href: props.href,
      src: props.src,
      content: props.content,
    },
  ];

  const [elements] = useState(navItems);

  return (
    <div ref={sidebarRef} className={Style.sidebar}>
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
        {elements.map((item, i) => (
          <li key={i} className={Style.item_barraLeft}>
            <a className={Style.a} href={item.href}>
              <div className={Style.logo_content_barraleft}>
                <div className={Style.logo}>
                  <i>
                    <img className={Style.svg_B} src={item.src} alt="" />
                  </i>
                  <p className={Style.name_barraleft}>{item.content}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
        <li className={Style.item_barraLeft}>
          <div className={Style.logo_content_barraleft}>
            <div className={Style.logo}>
              <ion-icon name="moon-outline" />
              <p className={Style.name_barraleft}>Dark Mode</p>
              <input
                type="checkbox"
                id="darkmode"
                onChange={() =>
                  document.body.classList.toggle("dark-mode")
                }
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Barra_Left;
