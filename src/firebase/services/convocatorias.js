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
  arrayUnion
} from 'firebase/firestore';
import { db } from '../config';

// Crear nueva convocatoria
export const createConvocatoria = async (convocatoriaData) => {
  try {
    const docRef = await addDoc(collection(db, 'convocatorias'), {
      ...convocatoriaData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0,
      active: true,
      estado: 'abierta',
      postulantes: [],
      cursoGeneradoId: null
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creando convocatoria:", error);
    return { success: false, error: error.message };
  }
};

// Obtener todas las convocatorias activas
export const getConvocatorias = async () => {
  try {
    const q = query(
      collection(db, 'convocatorias'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const convocatorias = [];
    querySnapshot.forEach((doc) => {
      convocatorias.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { success: true, data: convocatorias };
  } catch (error) {
    console.error("Error obteniendo convocatorias:", error);
    return { success: false, error: error.message };
  }
};

// Obtener convocatorias del profesor
export const getConvocatoriasByProfesor = async (profesorId) => {
  try {
    const convocatoriasSnapshot = await getDocs(collection(db, 'convocatorias'));
    const convocatorias = [];
    convocatoriasSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.profesorId === profesorId) {
        convocatorias.push({
          id: doc.id,
          ...data
        });
      }
    });
    return { success: true, data: convocatorias };
  } catch (error) {
    console.error("Error obteniendo convocatorias del profesor:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar convocatoria
export const updateConvocatoria = async (id, data) => {
  try {
    const convocatoriaRef = doc(db, 'convocatorias', id);
    await updateDoc(convocatoriaRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error actualizando convocatoria:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar convocatoria
export const deleteConvocatoria = async (id) => {
  try {
    await deleteDoc(doc(db, 'convocatorias', id));
    return { success: true };
  } catch (error) {
    console.error("Error eliminando convocatoria:", error);
    return { success: false, error: error.message };
  }
};

// Incrementar vistas de convocatoria
export const incrementViews = async (id) => {
  try {
    const convocatoriaRef = doc(db, 'convocatorias', id);
    const convocatoriaDoc = await getDoc(convocatoriaRef);
    if (convocatoriaDoc.exists()) {
      const currentViews = convocatoriaDoc.data().views || 0;
      await updateDoc(convocatoriaRef, {
        views: currentViews + 1
      });
    }
    return { success: true };
  } catch (error) {
    console.error("Error incrementando vistas:", error);
    return { success: false, error: error.message };
  }
};

// Postularse a una convocatoria
export const postularseConvocatoria = async (convocatoriaId, postulacionData) => {
  try {
    const convocatoriaRef = doc(db, 'convocatorias', convocatoriaId);
    
    // Verificar si ya está postulado
    const convocatoriaDoc = await getDoc(convocatoriaRef);
    if (convocatoriaDoc.exists()) {
      const postulantes = convocatoriaDoc.data().postulantes || [];
      const yaPostulado = postulantes.some(p => p.estudianteId === postulacionData.estudianteId);
      
      if (yaPostulado) {
        return { success: false, error: 'Ya te has postulado a esta convocatoria' };
      }
    }
    
    await updateDoc(convocatoriaRef, {
      postulantes: arrayUnion({
        ...postulacionData,
        estado: 'pendiente',
        fechaPostulacion: new Date().toISOString()
      }),
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error postulándose:", error);
    return { success: false, error: error.message };
  }
};

// Aceptar/Rechazar postulante
export const actualizarEstadoPostulante = async (convocatoriaId, estudianteId, nuevoEstado) => {
  try {
    const convocatoriaRef = doc(db, 'convocatorias', convocatoriaId);
    const convocatoriaDoc = await getDoc(convocatoriaRef);
    
    if (convocatoriaDoc.exists()) {
      const postulantes = convocatoriaDoc.data().postulantes || [];
      const postulanteIndex = postulantes.findIndex(p => p.estudianteId === estudianteId);
      
      if (postulanteIndex !== -1) {
        postulantes[postulanteIndex].estado = nuevoEstado;
        postulantes[postulanteIndex].fechaRespuesta = new Date().toISOString();
        
        await updateDoc(convocatoriaRef, {
          postulantes: postulantes,
          updatedAt: serverTimestamp()
        });
        
        return { success: true };
      }
    }
    
    return { success: false, error: 'Postulante no encontrado' };
  } catch (error) {
    console.error("Error actualizando estado:", error);
    return { success: false, error: error.message };
  }
};

// Cerrar convocatoria y crear curso
export const cerrarYCrearCurso = async (convocatoriaId) => {
  try {
    const convocatoriaRef = doc(db, 'convocatorias', convocatoriaId);
    const convocatoriaDoc = await getDoc(convocatoriaRef);
    
    if (!convocatoriaDoc.exists()) {
      return { success: false, error: 'Convocatoria no encontrada' };
    }
    
    const convocatoriaData = convocatoriaDoc.data();
    const aceptados = convocatoriaData.postulantes?.filter(p => p.estado === 'aceptado') || [];
    
    if (aceptados.length === 0) {
      return { success: false, error: 'No hay estudiantes aceptados' };
    }
    
    // Crear curso con estudiantes aceptados
    const cursoData = {
      titulo: convocatoriaData.titulo,
      descripcion: convocatoriaData.descripcion,
      profesorId: convocatoriaData.profesorId,
      profesorNombre: convocatoriaData.profesorNombre,
      categoria: convocatoriaData.tipo || 'general',
      duracion: convocatoriaData.duracion || 'N/A',
      nivel: 'intermedio',
      estudiantes: aceptados.map(p => p.estudianteId),
      estudiantesDetalles: aceptados,
      convocatoriaOrigenId: convocatoriaId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const cursoRef = await addDoc(collection(db, 'cursos'), cursoData);
    
    // Actualizar convocatoria
    await updateDoc(convocatoriaRef, {
      estado: 'convertida',
      cursoGeneradoId: cursoRef.id,
      updatedAt: serverTimestamp()
    });
    
    return { success: true, cursoId: cursoRef.id };
  } catch (error) {
    console.error("Error cerrando convocatoria:", error);
    return { success: false, error: error.message };
  }
};
