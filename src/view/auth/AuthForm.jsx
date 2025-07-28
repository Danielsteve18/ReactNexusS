// src/App.jsx
import { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2  
import { AuthFormlog } from "./JS_AuthForm";
import Style from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  
  const navigate = useNavigate(); 
  const [loginForm, setLoginForm] = useState({ correo: "", contraseña: "" });
 

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

 

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    try {
        const userCredentials = { correo: loginForm.correo, contraseña: loginForm.contraseña };
        console.log(userCredentials);

        const response = await AuthFormlog(userCredentials);

        if (response) {
            Swal.fire({
                title: "Bienvenido a NEXUS",
                text: `Tu correo es: ${response.correo}`,
                icon: "success",
                confirmButtonText:"OK",
            });

            // Limpia el formulario después de un login exitoso
            setLoginForm({ correo: "", contraseña: "" });
        } else {
            Swal.fire({
                title: "Error",
                text: "Credenciales incorrectas",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error en el login",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK",
        });
    }
};
  
 
  
  return (
    
    <div className={Style.container} >
      <div className={Style.form_container}>
        <form className={Style.form_Auth} onSubmit={handleLoginSubmit}>
          <h1 className={Style.h1Auth}>Sign in</h1>
          <label htmlFor="correo">Correo:</label>
          <input className={Style.input_form}
            name="correo"
            placeholder="juanitoFree@gmail.com"
            type="text"
            value={loginForm.correo}
            onChange={handleLoginChange}
            required
          />
          <label htmlFor="contraseña">Contraseña:</label>
          <input className={Style.input_form}
            name="contraseña"
            placeholder="*********************"
            type="pasword"
            value={loginForm.contraseña}
            onChange={handleLoginChange}
            required  
          />
          <button className={Style.button_Auth} type="submit">
            Login
          </button>
        </form>
      </div>
      

      <div className={Style.overlay_container}>
          <div className={Style.oeverlay_panel}>
            <div className={Style.text1}>
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Para seguir conectado con nosotros, ingresa tus datos personales.</p>
            </div>
            <div className={Style.text1}>
              <h1>¿No tienes una cuenta?</h1>
              <p>Da click en el siguiente boton y ¡Registrate!.</p>
              </div>
            <button  className={`${Style.ghost} ${Style.button}`} onClick={()=> navigate('/register-form')} >
              Registrarse
            </button>
         
        </div>
      </div>
    </div>
    
  );
}

export default AuthForm;
