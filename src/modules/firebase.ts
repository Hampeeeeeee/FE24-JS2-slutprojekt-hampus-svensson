// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgXFqabzNNSY1S2kYH7KzFf-wgRCPjeCQ",
  authDomain: "fe24-js2-slutprojekt-hampus.firebaseapp.com",
  projectId: "fe24-js2-slutprojekt-hampus",
  storageBucket: "fe24-js2-slutprojekt-hampus.firebasestorage.app",
  messagingSenderId: "1067969953223",
  appId: "1:1067969953223:web:d988d47955b59ab222ade2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


