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
  getDoc
} from 'firebase/firestore';
import { db } from '../config';

// Crear nuevo foro
export const createForo = async (foroData) => {
  try {
    const docRef = await addDoc(collection(db, 'foros'), {
      ...foroData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      mensajes: [],
      participantes: [foroData.creadorId],
      active: true
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creando foro:", error);
    return { success: false, error: error.message };
  }
};

// Obtener todos los foros
export const getForos = async () => {
  try {
    const q = query(
      collection(db, 'foros'),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const foros = [];
    querySnapshot.forEach((doc) => {
      foros.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { success: true, data: foros };
  } catch (error) {
    console.error("Error obteniendo foros:", error);
    return { success: false, error: error.message };
  }
};

// Obtener foros del usuario
export const getForosByUsuario = async (userId) => {
  try {
    const forosSnapshot = await getDocs(collection(db, 'foros'));
    const foros = [];
    forosSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.creadorId === userId || (data.participantes && data.participantes.includes(userId))) {
        foros.push({
          id: doc.id,
          ...data
        });
      }
    });
    return { success: true, data: foros };
  } catch (error) {
    console.error("Error obteniendo foros del usuario:", error);
    return { success: false, error: error.message };
  }
};

// Agregar mensaje al foro
export const addMensaje = async (foroId, mensaje) => {
  try {
    const foroRef = doc(db, 'foros', foroId);
    const foroDoc = await getDoc(foroRef);
    
    if (foroDoc.exists()) {
      const mensajes = foroDoc.data().mensajes || [];
      const nuevoMensaje = {
        id: Date.now().toString(),
        ...mensaje,
        timestamp: serverTimestamp()
      };
      
      mensajes.push(nuevoMensaje);
      
      await updateDoc(foroRef, {
        mensajes: mensajes,
        updatedAt: serverTimestamp()
      });
      
      return { success: true, mensaje: nuevoMensaje };
    }
    return { success: false, error: "Foro no encontrado" };
  } catch (error) {
    console.error("Error agregando mensaje:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar mensaje del foro
export const deleteMensaje = async (foroId, mensajeId) => {
  try {
    const foroRef = doc(db, 'foros', foroId);
    const foroDoc = await getDoc(foroRef);
    
    if (foroDoc.exists()) {
      const mensajes = foroDoc.data().mensajes || [];
      const nuevosMensajes = mensajes.filter(m => m.id !== mensajeId);
      
      await updateDoc(foroRef, {
        mensajes: nuevosMensajes,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    }
    return { success: false, error: "Foro no encontrado" };
  } catch (error) {
    console.error("Error eliminando mensaje:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar foro
export const updateForo = async (id, data) => {
  try {
    const foroRef = doc(db, 'foros', id);
    await updateDoc(foroRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error actualizando foro:", error);
    return { success: false, error: error.message };
  }
};

// Eliminar foro
export const deleteForo = async (id) => {
  try {
    await deleteDoc(doc(db, 'foros', id));
    return { success: true };
  } catch (error) {
    console.error("Error eliminando foro:", error);
    return { success: false, error: error.message };
  }
};
