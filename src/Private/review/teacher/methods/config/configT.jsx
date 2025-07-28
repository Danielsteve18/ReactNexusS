import Style from "../config/config.module.css";

function Configuracion() {
    return(
        <div className={Style.container}>
  {/* Sidebar Menu */}
  <div className={Style.sidebar}>
    <ul>
      <li className={Style.active} onclick="showSection('infooo')">
        <i className={`${Style.fas} ${Style.fa_user}`} /> Información de la cuenta
      </li>
      <li onclick="showSection('nonu')">
        <i className={`${Style.fas} ${Style.fa_lock}`} /> Configuración de privacidad
      </li>
      <li onclick="showSection('notifications')">
        <i className={`${Style.fas} ${Style.fa_bell}`} /> Notificaciones
      </li>
      <li onclick="showSection('language')">
        <i className={`${Style.fas} ${Style.fa_language}`} /> Preferencias de idioma
      </li>
    </ul>
  </div>
  <div id="main-content" className={Style.main_content}>
    {/* Profile Section */}
    <div className={Style.profile_section}>
      <img
        id="profile-pic"
        src="https://via.placeholder.com/150"
        alt="Foto de perfil"
        className={Style.profile_picture}
      />
      <input
        type="file"
        id="file-input"
        accept="image/*"
        className={Style.file_input}
      />
      <button id="upload-button" className={Style.upload_button} disabled="">
        Subir Imagen
      </button>
    </div>
  </div>
  {/* Statistics Section */}
  <div id="infooo" className={Style.content_secti}>
    <h2>holaaaa</h2>
  </div>
  <div id="nonu" className={Style.content_secti}>
    <div id="password-section">
      <h2>Cambiar Contraseña</h2>
      <form id="change-password-form">
        <label htmlFor="new-password">Nueva Contraseña:</label>
        <input
          type="password"
          id="new-password"
          placeholder="Ingresa tu nueva contraseña"
          required=""
        />
        <button
          type="button"
          id="change-password-btn"
          className={Style.change_password_button}
        >
          Actualizar Contraseña
        </button>
      </form>
    </div>
  </div>
</div>

    )
};

export default Configuracion;