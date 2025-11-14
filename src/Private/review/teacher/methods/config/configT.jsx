import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../../../../../firebase/services/users";
import Style from "../config/config.module.css";

function Configuracion() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("account");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  // Form states
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    telefono: "",
    bio: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    mensajes: true,
    foros: false
  });

  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");
    setUserRole(role);
    setUserId(id);
    
    // Cargar datos del usuario
    if (id) {
      loadUserData(id);
    }
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Cargar tamaño de fuente guardado
    const savedFontSize = localStorage.getItem("fontSize") || "14";
    setFontSize(parseInt(savedFontSize));
    document.documentElement.style.fontSize = `${savedFontSize}px`;
  }, []);

  const loadUserData = async (id) => {
    const result = await getUserData(id);
    if (result.success) {
      const user = result.data;
      setAccountData({
        name: user.name || "",
        email: user.email || "",
        telefono: user.telefono || "",
        bio: user.bio || ""
      });
    }
  };

  const handleBack = () => {
    if (userRole === "profesor") {
      navigate("/view-teachers");
    } else {
      navigate("/view-students");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAccountChange = (e) => {
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handleSaveAccount = async () => {
    // Validar campos requeridos
    if (!accountData.name || !accountData.telefono || !accountData.bio) {
      setSaveMessage("⚠️ Por favor completa todos los campos requeridos (Nombre, Teléfono, Biografía)");
      setTimeout(() => setSaveMessage(""), 4000);
      return;
    }

    setLoading(true);
    const result = await updateUserData(userId, {
      name: accountData.name,
      email: accountData.email,
      telefono: accountData.telefono,
      bio: accountData.bio
    });

    setLoading(false);
    if (result.success) {
      setSaveMessage("✅ Información actualizada correctamente");
      // Limpiar sesión storage de notificación
      sessionStorage.removeItem('profileNotificationDismissed');
    } else {
      setSaveMessage("❌ Error al actualizar: " + result.error);
    }
    
    setTimeout(() => setSaveMessage(""), 4000);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Cambiando contraseña");
    alert("Contraseña actualizada correctamente");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSaveNotifications = () => {
    console.log("Guardando notificaciones:", notifications);
    alert("Preferencias de notificación guardadas");
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    localStorage.setItem("fontSize", newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <div className={Style.config_body}>
      {/* Back Button */}
      <button className={Style.backButton} onClick={handleBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Regresar
      </button>

      <div className={Style.container}>
        {/* Sidebar Menu */}
        <div className={Style.sidebar}>
          <div className={Style.sidebar_header}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m9.22-9.22l-4.24 4.24M7.02 7.02L2.78 2.78m18.44 18.44l-4.24-4.24M7.02 16.98l-4.24 4.24"/>
            </svg>
            <h2>Configuración</h2>
            <p>Personaliza tu cuenta</p>
          </div>

          <ul className={Style.menu_list}>
            <li
              className={activeSection === "account" ? Style.active : ""}
              onClick={() => setActiveSection("account")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Información de cuenta
            </li>
            <li
              className={activeSection === "security" ? Style.active : ""}
              onClick={() => setActiveSection("security")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Seguridad y privacidad
            </li>
            <li
              className={activeSection === "notifications" ? Style.active : ""}
              onClick={() => setActiveSection("notifications")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              Notificaciones
            </li>
            <li
              className={activeSection === "appearance" ? Style.active : ""}
              onClick={() => setActiveSection("appearance")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              Apariencia
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className={Style.main_content}>
          {/* Account Section */}
          {activeSection === "account" && (
            <div className={Style.section}>
              <h2 className={Style.section_title}>Información de la cuenta</h2>
              
              <div className={Style.profile_card}>
                <div className={Style.profile_image_wrapper}>
                  <img
                    src={profileImage}
                    alt="Foto de perfil"
                    className={Style.profile_image}
                  />
                  <label className={Style.upload_overlay}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </label>
                </div>
              </div>

              <div className={Style.form_group}>
                <label>Nombre completo <span style={{color: '#ef4444'}}>*</span></label>
                <input
                  type="text"
                  name="name"
                  value={accountData.name}
                  onChange={handleAccountChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className={Style.form_group}>
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={accountData.email}
                  onChange={handleAccountChange}
                  placeholder="tu@email.com"
                  disabled
                  style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  El correo no se puede modificar
                </small>
              </div>

              <div className={Style.form_group}>
                <label>Teléfono <span style={{color: '#ef4444'}}>*</span></label>
                <input
                  type="tel"
                  name="telefono"
                  value={accountData.telefono}
                  onChange={handleAccountChange}
                  placeholder="+57 300 123 4567"
                  required
                />
              </div>

              <div className={Style.form_group}>
                <label>Biografía / Descripción <span style={{color: '#ef4444'}}>*</span></label>
                <textarea
                  name="bio"
                  value={accountData.bio}
                  onChange={handleAccountChange}
                  placeholder="Cuéntanos sobre ti, tus intereses, experiencia..."
                  rows="4"
                  required
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                  Mínimo 20 caracteres
                </small>
              </div>

              {saveMessage && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: saveMessage.includes('✅') ? '#d1fae5' : 
                             saveMessage.includes('⚠️') ? '#fef3c7' : '#fee2e2',
                  color: saveMessage.includes('✅') ? '#065f46' : 
                         saveMessage.includes('⚠️') ? '#92400e' : '#991b1b',
                  marginBottom: '15px',
                  fontSize: '0.95rem'
                }}>
                  {saveMessage}
                </div>
              )}

              <button 
                className={Style.save_button} 
                onClick={handleSaveAccount}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div style={{ 
                      width: '18px', 
                      height: '18px', 
                      border: '2px solid white',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          )}

          {/* Security Section */}
          {activeSection === "security" && (
            <div className={Style.section}>
              <h2 className={Style.section_title}>Seguridad y privacidad</h2>
              
              <div className={Style.password_card}>
                <h3>Cambiar contraseña</h3>
                <p className={Style.subtitle}>Mantén tu cuenta segura con una contraseña fuerte</p>

                <div className={Style.form_group}>
                  <label>Contraseña actual</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>

                <div className={Style.form_group}>
                  <label>Nueva contraseña</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>

                <div className={Style.form_group}>
                  <label>Confirmar nueva contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>

                <button className={Style.save_button} onClick={handleChangePassword}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Actualizar contraseña
                </button>
              </div>

              <div className={Style.privacy_options}>
                <h3>Opciones de privacidad</h3>
                <div className={Style.option_item}>
                  <div>
                    <h4>Perfil público</h4>
                    <p>Permite que otros usuarios vean tu perfil</p>
                  </div>
                  <label className={Style.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={Style.slider}></span>
                  </label>
                </div>
                <div className={Style.option_item}>
                  <div>
                    <h4>Mostrar actividad en línea</h4>
                    <p>Otros pueden ver cuando estás conectado</p>
                  </div>
                  <label className={Style.switch}>
                    <input type="checkbox" defaultChecked />
                    <span className={Style.slider}></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "notifications" && (
            <div className={Style.section}>
              <h2 className={Style.section_title}>Preferencias de notificación</h2>
              
              <div className={Style.notification_group}>
                <h3>Notificaciones por correo</h3>
                <div className={Style.option_item}>
                  <div>
                    <h4>Notificaciones por email</h4>
                    <p>Recibe actualizaciones en tu correo</p>
                  </div>
                  <label className={Style.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationToggle("email")}
                    />
                    <span className={Style.slider}></span>
                  </label>
                </div>
              </div>

              <div className={Style.notification_group}>
                <h3>Notificaciones push</h3>
                <div className={Style.option_item}>
                  <div>
                    <h4>Notificaciones del navegador</h4>
                    <p>Recibe alertas en tiempo real</p>
                  </div>
                  <label className={Style.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationToggle("push")}
                    />
                    <span className={Style.slider}></span>
                  </label>
                </div>
                <div className={Style.option_item}>
                  <div>
                    <h4>Nuevos mensajes</h4>
                    <p>Notificaciones de mensajes directos</p>
                  </div>
                  <label className={Style.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.mensajes}
                      onChange={() => handleNotificationToggle("mensajes")}
                    />
                    <span className={Style.slider}></span>
                  </label>
                </div>
                <div className={Style.option_item}>
                  <div>
                    <h4>Actividad en foros</h4>
                    <p>Respuestas y menciones en foros</p>
                  </div>
                  <label className={Style.switch}>
                    <input
                      type="checkbox"
                      checked={notifications.foros}
                      onChange={() => handleNotificationToggle("foros")}
                    />
                    <span className={Style.slider}></span>
                  </label>
                </div>
              </div>

              <button className={Style.save_button} onClick={handleSaveNotifications}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Guardar preferencias
              </button>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className={Style.section}>
              <h2 className={Style.section_title}>Apariencia</h2>
              
              <div className={Style.appearance_options}>
                <h3>Tema</h3>
                <div className={Style.theme_cards}>
                  <div 
                    className={`${Style.theme_card} ${theme === "light" ? Style.active : ""}`}
                    onClick={() => handleThemeChange("light")}
                  >
                    <div className={`${Style.theme_preview} ${Style.light}`}></div>
                    <p>Claro</p>
                  </div>
                  <div 
                    className={`${Style.theme_card} ${theme === "dark" ? Style.active : ""}`}
                    onClick={() => handleThemeChange("dark")}
                  >
                    <div className={`${Style.theme_preview} ${Style.dark}`}></div>
                    <p>Oscuro</p>
                  </div>
                  <div 
                    className={`${Style.theme_card} ${theme === "auto" ? Style.active : ""}`}
                    onClick={() => handleThemeChange("auto")}
                  >
                    <div className={`${Style.theme_preview} ${Style.auto}`}></div>
                    <p>Automático</p>
                  </div>
                </div>
              </div>

              <div className={Style.appearance_options}>
                <h3>Tamaño de fuente</h3>
                <div className={Style.font_size_control}>
                  <span>A</span>
                  <input 
                    type="range" 
                    min="12" 
                    max="18" 
                    value={fontSize}
                    onChange={handleFontSizeChange}
                  />
                  <span style={{ fontSize: "1.2rem" }}>A</span>
                </div>
                <p style={{ textAlign: "center", marginTop: "10px", color: "#666" }}>
                  Tamaño actual: {fontSize}px
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Configuracion;