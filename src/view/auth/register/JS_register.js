import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyB0gh9Hq5JXTEmeqvsJHLVQULdH1W7YffM",
    authDomain: "nexus-5c53d.firebaseapp.com",
    projectId: "nexus-5c53d",
    storageBucket: "nexus-5c53d.appspot.com",
    messagingSenderId: "208164583979",
    appId: "1:208164583979:web:8fd62a5c315fe50ad7486e",
    measurementId: "G-WENGRWS7N9"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export const registerUser = async ({nombre, correo, contraseña}) => {
    
    
        try {
            localStorage.setItem("nombre", nombre);
            // La función createUserWithEmailAndPassword espera solo email y password como argumentos
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
            console.log("Usuario registrado:", userCredential.user);
        } 
        catch (error) {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                console.log('Error: ' + error.message);
                
            } else {
                console.error("Error en el registro:", error.message);
                
            }
        }
};  


