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
        // La función createUserWithEmailAndPassword espera solo email y password como argumentos
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        
        // Guardar el nombre en localStorage
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("userId", userCredential.user.uid);
        
        console.log("Usuario registrado exitosamente:", userCredential.user);
        
        // Retornar éxito
        return { 
            success: true, 
            user: userCredential.user,
            message: "Usuario registrado exitosamente"
        };
    } 
    catch (error) {
        const errorCode = error.code;
        console.error("Error en el registro:", error.message);
        
        // Retornar el error específico
        if (errorCode === 'auth/email-already-in-use') {
            return { 
                success: false, 
                error: 'email-already-in-use',
                message: 'Este correo ya está registrado. Intenta iniciar sesión.'
            };
        } else if (errorCode === 'auth/weak-password') {
            return { 
                success: false, 
                error: 'weak-password',
                message: 'La contraseña debe tener al menos 6 caracteres.'
            };
        } else if (errorCode === 'auth/invalid-email') {
            return { 
                success: false, 
                error: 'invalid-email',
                message: 'El formato del correo no es válido.'
            };
        } else {
            return { 
                success: false, 
                error: 'unknown',
                message: error.message
            };
        }
    }
};  


