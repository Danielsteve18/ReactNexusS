import Style from "./teacher.module.css";
import {Barra_Left} from "../../../components/indexC";

function Teachers () {
    
    return(
        <div className={Style.bodyTeachers}>

        
            <Barra_Left
            href=""
            img=""
            content="Foros"

            href1=""
            img_1=""
            content1="Configuraciones"

            href2=""
            img_2=""
            content2="Actividad"

            href_3=""
            img_3=""
            content3="Convocatorias"

            href_4=""
            img_4=""
            content4="Abrir convocatorias"

            href_5=""
            img_5=""
            content5="Spam"

            href_6=""
            img_6=""
            content6="Trash"
            />
            <div className={Style.secion_perfil}>
                <img
                id="profile-pic"
                src="https://via.placeholder.com/150"
                alt="Foto de perfil"
                className={Style.profile_pic}
                />
            </div>
        <h1 className={Style.h1_teachers}>
            <span className={Style.bienvenido}>BIENVENIDO A NEXUS</span>
            <span className={Style.textoespecial}>TEACHER</span>
        </h1>
        <section id="mis-cursos" className={Style.CursosD}>
            <h2 className={Style.h2_t}>Mis Cursos</h2>
            <div id="coursesList">
           
                {/* Las convocatorias se cargarán aquí */}
                
            </div>
        </section>
        
        <div className="principal">
            <div className="cuadro">
            <a href="kkk">
                <img src="Picsart_24-09-11_17-04-33-397.png" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="jj">
                <img src="" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="uf">
                <img src="" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="">
                <img src="" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="im">
                <img src="" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="im">
                <img src="" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="im">
                <img src="" alt="" />
            </a>
            </div>
            <div className="cuadro">
            <a href="im">
                <img src="" alt="" />
            </a>
            </div>
        </div>
</div>

    )
    
};

export default Teachers