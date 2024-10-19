import { initializeApp } from "firebase/app";

const firebaseApp = import.meta.env ?
      initializeApp({                        // for Vue
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
        measurementId: import.meta.env.VITE_MEASUREMENT_ID
      }) :
      initializeApp({                        // for Node.js
        apiKey: process.env.VITE_API_KEY,    // process.env requires a package 'dotenv'.
        authDomain: process.env.VITE_AUTH_DOMAIN,
        projectId: process.env.VITE_PROJECT_ID,
        storageBucket: process.env.VITE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_APP_ID,
        measurementId: process.env.VITE_MEASUREMENT_ID
      });

export default firebaseApp;
