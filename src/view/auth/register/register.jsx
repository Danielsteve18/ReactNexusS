// src/App.jsx
import { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2  
import { registerUser} from "./JS_register";
import Style from "../AuthForm.module.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  
  const navigate = useNavigate(); 
  const [registerForm, setRegisterForm] = useState({Name:"", correo: "", contraseña: "" });
 

  const handleLoginChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
 const navegar= (e) => navigate('/login-form');

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    try {
      const userCredentials = { nombre: registerForm.Name, correo: registerForm.correo, contraseña: registerForm.contraseña };
      const response = await registerUser(userCredentials);
      
      if (response){
      Swal.fire({
          title: "Bienvenido a NEXUS",
          text: `Tu nombre es: ${localStorage.getItem("nombre")}
           Preciona "oK" para iniciar seccion`,
          icon: "success",
          confirmButtonText: `OK ${navegar}`, 
      });
    } else if (!response){
      Swal.fire({
        title: "Credenciales existentes",
        text: "Ingresa con nuvas, credenciales.",
        icon: "error",
        confirmButtonText: "OK"
    });

    } else{
      Swal.fire({
        title: "Vuelve a interalo",
        text:"error en el registro",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
      
       // Limpia el formulario después de un login exitoso
       setRegisterForm({ correo: "", contraseña: "" });
          

    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    // Limpia el formulario
    setRegisterForm({Name: "", correo: "", contraseña: "" });
  };

 
  
  return (
    <div className={Style.body}>
    <div className={Style.container} >
      <div className={Style.form_container}>
        <form className={Style.form_Auth} onSubmit={handleLoginSubmit}>
          <h1 className={Style.h1Auth}>Registrate</h1>
          <label htmlFor="nombre">Nombre</label>
          <input className={Style.input_form}
            name="Name"
            placeholder="juanitoFree"
            type="text"
            value={registerForm.Name}
            onChange={handleLoginChange}
            required
          />
        <label htmlFor="correo">Correo</label>
          <input className={Style.input_form}
            name="correo"
            placeholder="juanitoFree@gmail.com"
            type="text"
            value={registerForm.correo}
            onChange={handleLoginChange}
            required
          />
          <label htmlFor="contraseña">Contraseña</label>
          <input className={Style.input_form}
            name="contraseña"
            placeholder="*********************"
            type="pasword"
            value={registerForm.contraseña}
            onChange={handleLoginChange}
            required  
          />
          <button className={Style.button_Auth} type="submit">
            Registrarse
          </button>
        </form>
      </div>
      

      <div className={Style.overlay_container}>
          <div className={Style.oeverlay_panel}>
            <div className={Style.text1}>
              <h1>¡Bienvenido a <strong>NEXUS</strong>!</h1>
              <p>Para seguir conectado con nosotros, registrate.</p>
            </div>
            <div className={Style.text1}>
              <h1>¿Ya tienes una cuenta?</h1>
              <p>Da click en el siguiente boton y ¡Disfruta de <strong>NEXUS</strong>!</p>
              </div>
            <button  className={`${Style.ghost} ${Style.button}`} onClick={()=> navigate('/login-form')} >
              Login
            </button>
         
        </div>
      </div>
    </div>
    </div>
  );
}

export default RegisterForm;
