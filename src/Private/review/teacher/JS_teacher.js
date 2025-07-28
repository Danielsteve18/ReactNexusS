import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, deleteDoc} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

/*const firebaseConfig = {
    apiKey: "AIzaSyB0gh9Hq5JXTEmeqvsJHLVQULdH1W7YffM",
    authDomain: "nexus-5c53d.firebaseapp.com",
    projectId: "nexus-5c53d",
    storageBucket: "nexus-5c53d.appspot.com",
    messagingSenderId: "208164583979",
    appId: "1:208164583979:web:8fd62a5c315fe50ad7486e",
    measurementId: "G-WENGRWS7N9"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();
  
  // Elemento del DOM donde se mostrará la imagen de perfil
  var profilePic = document.getElementById('profile-pic');
  
  // Recuperar la imagen de perfil al cargar la página si el usuario está autenticado
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Obtener la referencia de la imagen en Firebase Storage
        var storageRef = storage.ref('profile_pics/' + user.uid);
  
        // Listar todos los archivos en la carpeta del usuario
        storageRef.listAll().then(function(result) {
            if (result.items.length > 0) {
                // Obtener la URL del primer archivo de la lista
                result.items[0].getDownloadURL().then(function(url) {
                    profilePic.src = url; // Establecer la imagen de perfil al cargar
                });
            } else {
                console.log("No se encontró ninguna imagen de perfil para este usuario.");
            }
        }).catch(function(error) {
            console.error("Error al recuperar la imagen de perfil:", error);
        });
    } else {
        console.log("El usuario no está autenticado.");
    }
  }); */
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB0gh9Hq5JXTEmeqvsJHLVQULdH1W7YffM",
    authDomain: "nexus-5c53d.firebaseapp.com",
    projectId: "nexus-5c53d",
    storageBucket: "nexus-5c53d.appspot.com",
    messagingSenderId: "208164583979",
    appId: "1:208164583979:web:8fd62a5c315fe50ad7486e",
    measurementId: "G-WENGRWS7N9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Función para cargar las convocatorias del profesor
export async function loadUserCourses(userId) {
    const coursesList = document.getElementById("coursesList");
    coursesList.innerHTML = ""; // Limpiar la lista de cursos previos

    const convocatoriasRef = collection(db, "convocatorias");
    const q = query(convocatoriasRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const convocatoriaData = doc.data();
        const courseItem = document.createElement("div");
        courseItem.className = "course-item";
        courseItem.setAttribute("data-course-id", doc.id); // Guardar el ID del curso
        courseItem.innerHTML = `
            <h4>${convocatoriaData.institution} - ${convocatoriaData.level}</h4>
            <p>${convocatoriaData.description}</p>
            <p><strong>Ubicación:</strong> ${convocatoriaData.location}</p>
            <p><strong>Estudiantes Requeridos:</strong> ${convocatoriaData.studentCount}</p>
               <button class="btn-aula"data-course-name="${convocatoriaData.institution}" >ir al aula virtual </button>
        `;
        coursesList.appendChild(courseItem);
        courseItem.querySelector(".btn-aula").addEventListener("click", (event) => {
            const courseName = event.target.getAttribute("data-course-name");
            window.location.href = ` aulavprofe.html?course=${encodeURIComponent(courseName)}`;
        });
        // Evento click para cambiar la vista principal
        courseItem.addEventListener("click", () => {
            changeMainView(convocatoriaData.institution); // Pasar el nombre de la institución
        });
    });

    // Mensaje si no hay cursos abiertos
    if (querySnapshot.empty) {
        coursesList.innerHTML = "<p>No tienes convocatorias abiertas.</p>";
    }
}

// Función para cambiar el contenido de la vista principal y cargar estudiantes
async function changeMainView(institutionName) {
    const mainView = document.querySelector(".principal");
    mainView.innerHTML = "<p>Cargando estudiantes...</p>"; // Indicador de carga

    const clasesRef = collection(db, "clases");
    const q = query(clasesRef, where("convocatoria", "==", institutionName)); // Comparar con el campo 'convocatoria'
    const querySnapshot = await getDocs(q);

    mainView.innerHTML = ""; // Limpiar la vista principal

    if (!querySnapshot.empty) {
        const studentsList = document.createElement("div");
        studentsList.className = "students-list";
        studentsList.innerHTML=`
        <button>
            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>Back</span>
        </button>
        `
        querySnapshot.forEach((doc) => {
            const claseData = doc.data();
            const studentItem = document.createElement("div");
            studentItem.className = "student-item";
            studentItem.innerHTML = `
                <p><strong>Nombre:</strong> ${claseData.studentName}</p>
                <p><strong>ID:</strong> ${claseData.userId}</p>

                    <button class="button">
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" class="svg-icon">
                            <g
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            stroke="#fa0505"
                            stroke-linecap="round"
                            stroke-width="2"
                            >
                            <path
                                d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z"
                            ></path>
                            <path
                                d="M8 10v6m4-6v6m4-6v6"
                            ></path>
                            </g>
                        </svg>
                        <span class="lable">Eliminar</span>
                        </button>
                
                

            `;
            studentsList.appendChild(studentItem);
            mainView.appendChild(studentsList);
                    const handledeleteButton = studentItem.querySelector(".button");
                    

                        const handleDelete = async () => {
                        try {
                            // Mostrar alerta de confirmación con SweetAlert2
                            const result = await Swal.fire({
                            title: "¿Estás seguro?",
                            text: "Esta acción no se puede deshacer",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar",
                            });

                            // Si el usuario confirma, procede a eliminar
                            if (result.isConfirmed) {
                            await deleteDoc(doc.ref); // Eliminar el documento de la base de datos
                            studentItem.remove(); // Eliminar el elemento visualmente
                            Swal.fire("Eliminado", "El elemento ha sido eliminado.", "success");
                            }
                        } catch (error) {
                            console.error("Error eliminando este estudiante:", error);
                        }
                        };

                // Agregar evento al botón
                handledeleteButton.addEventListener("click", handleDelete);

        });
        
    } else {
        mainView.innerHTML = "<p>No hay estudiantes asociados a esta convocatoria.</p>";
    }


    backButton.addEventListener("click", () => {
        loadUserCourses(auth.currentUser.uid); // Recargar los cursos
    });

    mainView.appendChild(backButton);
}

// Verificar si el usuario está autenticado y cargar sus convocatorias
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserCourses(user.uid);
    } else {
        console.log("Usuario no autenticado");
    }
});

        