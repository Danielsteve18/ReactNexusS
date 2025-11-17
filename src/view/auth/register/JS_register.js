import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";

export const registerUser = async ({nombre, correo, contrase�a}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contrase�a);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("userId", userCredential.user.uid);
        console.log("Usuario registrado exitosamente:", userCredential.user);
        return { 
            success: true, 
            user: userCredential.user,
            message: "Usuario registrado exitosamente"
        };
    } 
    catch (error) {
        const errorCode = error.code;
        console.error("Error en el registro:", error.message);
        if (errorCode === 'auth/email-already-in-use') {
            return { 
                success: false, 
                error: 'email-already-in-use',
                message: 'Este correo ya est� registrado. Intenta iniciar sesi�n.'
            };
        } else if (errorCode === 'auth/weak-password') {
            return { 
                success: false, 
                error: 'weak-password',
                message: 'La contrase�a debe tener al menos 6 caracteres.'
            };
        } else if (errorCode === 'auth/invalid-email') {
            return { 
                success: false, 
                error: 'invalid-email',
                message: 'El formato del correo no es v�lido.'
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

