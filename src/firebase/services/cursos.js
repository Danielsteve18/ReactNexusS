import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  getDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../config';

// Crear nuevo curso
export const createCurso = async (cursoData) => {
  try {
    const docRef = await addDoc(collection(db, 'cursos'), {
      ...cursoData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      estudiantes: [],
      active: true
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creando curso:", error);
    return { success: false, error: error.message };
  }
};

// Obtener todos los cursos
export const getCursos = async () => {
  try {
    const q = query(
      collection(db, 'cursos'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const cursos = [];
    querySnapshot.forEach((doc) => {
      cursos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { success: true, data: cursos };
  } catch (error) {
    console.error("Error obteniendo cursos:", error);
    return { success: false, error: error.message };
  }
};

// Obtener curso por ID
export const getCursoById = async (cursoId) => {
  try {
    const cursoRef = doc(db, 'cursos', cursoId);
    const cursoSnap = await getDoc(cursoRef);
    
    if (cursoSnap.exists()) {
      return { 
        success: true, 
        data: {
          id: cursoSnap.id,
          ...cursoSnap.data()
        }
      };
    } else {
      return { success: false, error: 'Curso no encontrado' };
    }
  } catch (error) {
    console.error("Error obteniendo curso:", error);
    return { success: false, error: error.message };
  }
};

// Obtener cursos del profesor
export const getCursosByProfesor = async (profesorId) => {
  try {
    const cursosSnapshot = await getDocs(collection(db, 'cursos'));
    const cursos = [];
    cursosSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.profesorId === profesorId) {
        cursos.push({
          id: doc.id,
          ...data
        });
      }
    });
    return { success: true, data: cursos };
  } catch (error) {
    console.error("Error obteniendo cursos del profesor:", error);
    return { success: false, error: error.message };
  }
};

// Obtener cursos del estudiante
export const getCursosByEstudiante = async (estudianteId) => {
  try {
    const cursosSnapshot = await getDocs(collection(db, 'cursos'));
    const cursos = [];
    cursosSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.estudiantes && data.estudiantes.includes(estudianteId)) {
        cursos.push({
          id: doc.id,
          ...data
        });
      }
    });
    return { success: true, data: cursos };
  } catch (error) {
    console.error("Error obteniendo cursos del estudiante:", error);
    return { success: false, error: error.message };
  }
};

// Inscribir estudiante en curso
export const inscribirEstudiante = async (cursoId, estudianteId) => {
  try {
    const cursoRef = doc(db, 'cursos', cursoId);
    await updateDoc(cursoRef, {
      estudiantes: arrayUnion(estudianteId),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error inscribiendo estudiante:", error);
    return { success: false, error: error.message };
  }
};

// Desinscribir estudiante de curso
export const desinscribirEstudiante = async (cursoId, estudianteId) => {
  try {
    const cursoRef = doc(db, 'cursos', cursoId);
    await updateDoc(cursoRef, {
      estudiantes: arrayRemove(estudianteId),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error desinscribiendo estudiante:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar curso
export const updateCurso = async (id, data) => {
  try {
    const cursoRef = doc(db, 'cursos', id);
    await updateDoc(cursoRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error actualizando curso:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar curso
export const deleteCurso = async (id) => {
  try {
    await deleteDoc(doc(db, 'cursos', id));
    return { success: true };
  } catch (error) {
    console.error("Error eliminando curso:", error);
    return { success: false, error: error.message };
  }
};
