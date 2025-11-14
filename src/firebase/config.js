import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCATBFJTIIOVIUjDgZdNXD2L6cFtafD3mA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexus-5c53d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexus-5c53d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexus-5c53d.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "470086607886",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:470086607886:web:56b069a34ab94e44ee11b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
