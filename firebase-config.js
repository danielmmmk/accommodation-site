
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDSlyCOnqlXUseDOx-0fw-BwGARx9-3kYY",
  authDomain: "korea-trip-c16ba.firebaseapp.com",
  projectId: "korea-trip-c16ba",
  storageBucket: "korea-trip-c16ba.firebasestorage.app",
  messagingSenderId: "1069612295844",
  appId: "1:1069612295844:web:b4c8a34df4d8e946472831",
  measurementId: "G-Z440E6RWJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Silent login (no UI)
signInAnonymously(auth).catch((error) => {
  console.error("Anonymous auth failed:", error);
});
