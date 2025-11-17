import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "@/firebase/config";

//transicion Form
        
        
//fin Trs Form
// Manejo del inicio de sesi�n
export const AuthFormlog= async({correo, contrase�a}) =>{

    const email = correo;
    const password = contrase�a;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Inicio de sesi�n exitoso");

        // Verificar si ya tiene un rol asignado
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);  // Referencia al documento del usuario
        const userDoc = await getDoc(userRef);  // Obtener el documento

        if (userDoc.exists() && userDoc.data().role) {
            var role = userDoc.data().role;
            
            // Guardar rol en localStorage para persistencia
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', user.uid);
            
            // Redirigir seg�n el rol
            if (role === "profesor") {
                window.location.href = '/view-teachers';
            } else if (role === "student") {
                window.location.href = '/view-students';
            }
        } else {
            // Si no tiene rol, redirigir a la p�gina de selecci�n de roles
            localStorage.setItem('userId', user.uid);
            window.location.href = '/view-rol';
        }
    } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
            alert('Contrase�a incorrecta');
        } else if (errorCode === 'auth/user-not-found') {
            alert('Usuario no encontrado');
        } else if (errorCode === 'auth/invalid-email') {
            alert('Correo no es v�lido');
        } else {
            alert('Error: ' + error.message);
        }
    }
};
/*
// Cerrar sesi�n
document.getElementById('cerrar').addEventListener('click', async (e) => {
    e.preventDefault();  // Prevenir el env�o del formulario

    try {
        await signOut(auth);
        alert("Cierre de sesi�n exitoso");
        window.location.href = "/login.html";  // Redirigir al login despu�s de cerrar sesi�n
    } catch (error) {
        alert('Error al cerrar sesi�n: ' + error.message);
    }
});
*/


