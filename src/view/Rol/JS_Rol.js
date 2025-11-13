import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0gh9Hq5JXTEmeqvsJHLVQULdH1W7YffM",
    authDomain: "nexus-5c53d.firebaseapp.com",
    projectId: "nexus-5c53d",
    storageBucket: "nexus-5c53d.appspot.com",
    messagingSenderId: "208164583979",
    appId: "1:208164583979:web:8fd62a5c315fe50ad7486e",
    measurementId: "G-WENGRWS7N9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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