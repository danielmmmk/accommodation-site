
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
firebase.initializeApp(firebaseConfig);

// Services
const db = firebase.firestore();
const auth = firebase.auth();

auth.signInAnonymously();
