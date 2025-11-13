// Script para eliminar convocatorias vacías de Firebase
// Ejecutar con: node cleanEmptyConvocatorias.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkS5lL7ongUf2w_MP36Be9eatP-06g_aE",
    authDomain: "nexus-b01f9.firebaseapp.com",
    projectId: "nexus-b01f9",
    storageBucket: "nexus-b01f9.firebasestorage.app",
    messagingSenderId: "727698590876",
    appId: "1:727698590876:web:0c60a0c06e5e43f4ebf948",
    measurementId: "G-XWZWK4C0H9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanEmptyConvocatorias() {
    try {
        console.log('🔍 Buscando convocatorias vacías...\n');
        
        const convocatoriasRef = collection(db, 'convocatorias');
        const snapshot = await getDocs(convocatoriasRef);
        
        let emptyCount = 0;
        let totalCount = snapshot.docs.length;
        const toDelete = [];
        
        snapshot.docs.forEach((docSnapshot) => {
            const data = docSnapshot.data();
            const isEmpty = !data.titulo || !data.descripcion || 
                           data.titulo.trim() === '' || 
                           data.descripcion.trim() === '';
            
            if (isEmpty) {
                emptyCount++;
                toDelete.push({
                    id: docSnapshot.id,
                    titulo: data.titulo || '(sin título)',
                    descripcion: data.descripcion || '(sin descripción)'
                });
            }
        });
        
        console.log(`📊 Total de convocatorias: ${totalCount}`);
        console.log(`🗑️  Convocatorias vacías encontradas: ${emptyCount}\n`);
        
        if (emptyCount === 0) {
            console.log('✅ No hay convocatorias vacías para eliminar.');
            process.exit(0);
        }
        
        console.log('📋 Lista de convocatorias a eliminar:');
        toDelete.forEach((conv, index) => {
            console.log(`${index + 1}. ID: ${conv.id}`);
            console.log(`   Título: ${conv.titulo}`);
            console.log(`   Descripción: ${conv.descripcion.substring(0, 50)}...\n`);
        });
        
        // Eliminar convocatorias vacías
        console.log('🗑️  Eliminando convocatorias vacías...\n');
        
        for (const conv of toDelete) {
            await deleteDoc(doc(db, 'convocatorias', conv.id));
            console.log(`✅ Eliminada: ${conv.id}`);
        }
        
        console.log(`\n✨ Proceso completado. Se eliminaron ${emptyCount} convocatorias vacías.`);
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error al limpiar convocatorias:', error);
        process.exit(1);
    }
}

// Ejecutar el script
cleanEmptyConvocatorias();
