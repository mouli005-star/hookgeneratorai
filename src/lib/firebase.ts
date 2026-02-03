import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCwIEfEyPrjVQzWplY4H73gBRoiST-5W0",
    authDomain: "ai-content-hook-generator.firebaseapp.com",
    projectId: "ai-content-hook-generator",
    storageBucket: "ai-content-hook-generator.firebasestorage.app",
    messagingSenderId: "777802120781",
    appId: "1:777802120781:web:332a0287de9e5ab3eae604",
    measurementId: "G-02YX6BHRFR"
};

// Initialize Firebase for Next.js (SSR safe)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
