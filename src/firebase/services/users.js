import { 
  doc, 
  getDoc, 
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config';

// Obtener datos del usuario
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { 
        success: true, 
        data: {
          id: userSnap.id,
          ...userSnap.data()
        }
      };
    } else {
      return { success: false, error: 'Usuario no encontrado' };
    }
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return { success: false, error: error.message };
  }
};

// Actualizar datos del usuario
export const updateUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      profileCompleted: true,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return { success: false, error: error.message };
  }
};

// Verificar si el perfil está completo
export const checkProfileComplete = async (userId) => {
  try {
    const result = await getUserData(userId);
    if (!result.success) {
      return { complete: false, missing: [] };
    }

    const user = result.data;
    const requiredFields = ['name', 'telefono', 'bio'];
    const missing = [];

    requiredFields.forEach(field => {
      if (!user[field] || user[field].trim() === '') {
        missing.push(field);
      }
    });

    return {
      complete: missing.length === 0,
      missing: missing,
      data: user
    };
  } catch (error) {
    console.error("Error verificando perfil:", error);
    return { complete: false, missing: [], error: error.message };
  }
};
