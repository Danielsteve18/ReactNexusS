import Style from "../foro/foro.module.css";

function Foro() {
    return(
        <div className={Style.body_foro}>
            <div className={Style.chat_container}>
              <div className={Style.sidebar}>

                <div className="chat-global">
                  NEXUS FOROS
                </div>

                <div className={Style.search_box}>
                  <input type="text" placeholder="Search..." />
                </div>

                <div className={Style.create_forum}>
                  
                  <input
                    type="text"
                    id="new-forum-name"
                    placeholder="Nombre del nuevo foro"
                    autoComplete="off"
                  />
                  
                  <select id="forum-privacy">
                    <option value="public">Público</option>
                    <option value="private">Privado</option>
                  </select>
                  
                  <input className={Style.F_file} type="file" id="new-forum-image" accept="image/*" />
                  
                  <input
                    type="password"
                    id="forum-pin"
                    placeholder="PIN (solo para foros privados)"
                    style={{ display: "none" }}
                  />
                  <br/>
                  <button className={Style.button_foro}  id="create-forum">Crear Foro</button>
                </div>

                <button className={Style.button_foro} id="my-forums-button">mis foros</button>

                <div className={Style.forums_list} id="forums-list">
                  {/* Aquí se mostrarán los foros creados */}
                </div>

                <div
                  className={Style.my_forums_list}
                  id="my-forums-list"
                  style={{ display: "none" }}
                >
                  {/* Aquí se mostrarán los foros del usuario */}
                </div>

              </div>
              <div className={Style.chat_box}>
                <div className={Style.header}>
                  <img
                    src="perfil.jpg"
                    alt="Foto de perfil"
                    className={Style.profile_pic}
                    id="forum-profile-pic"
                  />
                  <div className={Style.forum_title}>

                    <span className={Style.forum_name} id="forum-name">
                      Nombre del Foro
                    </span>

                    <span className={Style.forum_status}
                    >Activo</span> {/* Estado del foro */}

                  </div>
                  <button className={Style.button_foro} id="delete-forum" style={{ display: "none" }}>
                    Eliminar Foro
                  </button>{" "}
                  {/* Botón para eliminar foro */}
                </div>

                <div id="messages" className={Style.messages}>
                  <div className={Style.secion_perfil}>
                    <img
                      id="fotico"
                      src="https://via.placeholder.com/150"
                      alt="Foto de perfil"
                      className={Style.profile_pic}
                    />
                  </div>
                  {/* Aquí se mostrarán los mensajes que vendrán de tu base de datos */}
                </div>
                <div className={Style.input_box}>
                  <input type="text" id="message" placeholder="Escribe tu mensaje aquí" />
                  <button className={Style.button_foro} id="send">Enviar</button>
                </div>
              </div>
            </div>

        </div>
    )
};

export default Foro;