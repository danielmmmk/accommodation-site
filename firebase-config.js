import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js'
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js'

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
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Anonymous sign-in error:", error);
  });

