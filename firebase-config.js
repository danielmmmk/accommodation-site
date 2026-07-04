
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSlyCOnqlXUseDOx-0fw-BwGARx9-3kYY",
  authDomain: "korea-trip-c16ba.firebaseapp.com",
  projectId: "korea-trip-c16ba",
  storageBucket: "korea-trip-c16ba.firebasestorage.app",
  messagingSenderId: "1069612295844",
  appId: "1:1069612295844:web:b4c8a34df4d8e946472831",
  measurementId: "G-Z440E6RWJQ"
};

const app = initializeApp(firebaseConfig);
