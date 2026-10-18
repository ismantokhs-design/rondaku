// ==========================================
// KONFIGURASI FIREBASE (PROJECT: rondaku-d4f5e)
// ==========================================

// Import SDK Firebase dari CDN (versi 10.8.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Konfigurasi kredensial Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyD7EL0i57nkHRIWkxh1QFGIcnLncmY9Zz8",
  authDomain: "rondaku-d4f5e.firebaseapp.com",
  projectId: "rondaku-d4f5e",
  storageBucket: "rondaku-d4f5e.firebasestorage.app",
  messagingSenderId: "166097225581",
  appId: "1:166097225581:web:701df4510cbd20b5a3bc64",
  measurementId: "G-FQJ6D5VXM7"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Daftarkan ke window agar bisa diakses secara global oleh halaman dinamis / SPA
window.firebaseDb = db;
window.firebaseFirestore = { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc,
  updateDoc 
};

// REVISI: Ekspor 'app' dan 'db' secara bersamaan agar aman diimpor dari file mana saja
export { app, db };