import Style from "../student/students.module.css";
import {Barra_Left} from "../../../components/indexC/C_meta/BarraLateral.jsx";

const items = [
    {
      href: "",
      src: "./icons/home.svg",
      content: "Nuevo Curso",
    },
    {
      href: "",
      src: "./icons/home.svg",
      content: "Foros",
    },
    {
      href: "",
      src: "./icons/home.svg",
      content: "Configuraciónes",
    },
    {
      href: "",
      src: "./icons/home.svg",
      content: "Actividad",
    },
    {
      href: "",
      src: "./icons/home.svg",
      content: "Convocatorias",
    },
    {
      href: "",
      src: "./icons/home.svg",
      content: "Spam",
    },
    {
      href: "",
      src: "./icons/home.svg",
      content: "Trash",
    }
  ];
   
function Estudents(){
    return (
        <div id="punto" className={Style.bodyEstudents}>
            <Barra_Left items={items}/>
            
            
            <div className={Style.secion_perfilE}>
                <img id="profile-pic" src="https://via.placeholder.com/150" alt="Foto de perfil" className={Style.profile_picE}/>
                <div className={Style.RolE}><strong>Rol:</strong> <span className={Style.textoespecialE}>Estudiante</span></div>
                <div className={Style.dateE}>
                    <p >name: papapap</p>
                    <p >name: papapapa</p>
                    
                </div>
               
                <button type="button" className={Style.buttonE}>
                    
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 28 28">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
                </svg>

                </button>
                
            </div>
                
            <div className={Style.Tsudents} id="mis-talleres">
            <h1 className={Style.h1_students}>
                <span className={Style.bienvenidoE}>BIENVENIDO A NEXUS</span>
                <br/>
                <span className={Style.textoespecialE}>student</span>
            </h1>
                            <h2><strong>Talleres Pendientes</strong></h2>
                            <div id="pendingWorkshops">
                                {/*Los talleres pendientes se cargarán aquí */}
                            </div>
                        </div>

            <div id="mis-cursos" className={Style.Courses_students}>
                <h2><strong>Mis Cursos</strong></h2>
                <div id="coursesList">
                    {/* Las convocatorias se cargarán aquí */}
                </div>
            </div>
            
             
                <div className={`${Style.cuadro1} ${Style.cuadro}`}><a href="uf"><img src="" alt=""/></a></div>
                <div className={`${Style.cuadro2} ${Style.cuadro}`}><a href=""><img src="" alt=""/></a></div>
                <div className={`${Style.cuadro3} ${Style.cuadro}`}><a href="im"><img src="" alt=""/></a></div>
                <div className={`${Style.cuadro4} ${Style.cuadro}`}><a href="im"><img src="" alt=""/></a></div>
               
            
                    
        </div>
    );
}

export default Estudents