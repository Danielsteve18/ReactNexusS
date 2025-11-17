import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export const saveUserRole = async (role) => {
    try {
        const user = auth.currentUser;
        
        if (!user) {
            throw new Error('Usuario no autenticado');
        }

        // Guardar en Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { role: role }, { merge: true });

        // Guardar en localStorage para persistencia
        localStorage.setItem('userRole', role);
        localStorage.setItem('userId', user.uid);

        console.log('Rol guardado correctamente:', role);
        return { success: true, role };

    } catch (error) {
        console.error('Error guardando el rol:', error);
        throw error;
    }
};

export const getUserRole = () => {
    return localStorage.getItem('userRole');
};

export const clearUserRole = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
};   

