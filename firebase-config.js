import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js'
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js'
import { getFirestore, doc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyDSlyCOnqlXUseDOx-0fw-BwGARx9-3kYY",
  authDomain: "korea-trip-c16ba.firebaseapp.com",
  projectId: "korea-trip-c16ba",
  storageBucket: "korea-trip-c16ba.firebasestorage.app",
  messagingSenderId: "1069612295844",
  appId: "1:1069612295844:web:b4c8a34df4d8e946472831",
  measurementId: "G-Z440E6RWJQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

await signInAnonymously(auth);

console.log("Signed in anonymously");

signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Anonymous sign-in error:", error);
  });

