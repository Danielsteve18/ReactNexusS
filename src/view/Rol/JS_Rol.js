/*
https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
    
    "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"
    "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth-compat.js"





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
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const auth = firebase.auth();

        document.querySelectorAll('.role-selection img').forEach(img => {
            img.addEventListener('click', function() {
                document.querySelectorAll('.role-selection img').forEach(img => img.classList.remove('selected'));
                this.classList.add('selected');
                this.previousElementSibling.checked = true;
            });
        });

        document.getElementById('role-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const selectedRole = document.querySelector('input[name="role"]:checked');
            if (selectedRole) {
                const user = firebase.auth().currentUser;
                if (user) {
                    db.collection('users').doc(user.uid).set({
                        role: selectedRole.value
                    }, { merge: true })
                    .then(() => {
                        console.log('Rol guardado correctamente en Firebase');
                        alert('Rol guardado correctamente en Firebase');
                        if (selectedRole.value === 'profesor') {
                            window.location.href = 'prfesor.html';
                        } else if (selectedRole.value === 'estudiante') {
                            window.location.href = 'vitsa1.html';
                        }
                    })
                    .catch((error) => {
                        console.error('Error guardando el rol: ', error);
                        alert('Error guardando el rol: ' + error.message);
                    });
                } else {
                    alert('Usuario no autenticado');
                    console.error('Usuario no autenticado');
                }
            } else {
                alert('Por favor selecciona un rol.');
                console.error('Rol no seleccionado');
            }
        });

        // Simulate user login for testing purposes (remove in production)
        auth.signInAnonymously()
            .then(() => {
                console.log('Usuario anónimo autenticado para pruebas');
            })
            .catch((error) => {
                console.error('Error en autenticación anónima: ', error);
                alert('Error en autenticación anónima: ' + error.message);
            });
 */   