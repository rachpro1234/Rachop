// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkEHtdEfShJ5a1KXIO51iBLoftZ3iEfFg",
  authDomain: "rachop-48809.firebaseapp.com",
  projectId: "rachop-48809",
  storageBucket: "rachop-48809.appspot.com",
  messagingSenderId: "347415145379",
  appId: "1:347415145379:web:c8329f108c8688b4f40816",
  measurementId: "G-1MRLQKYCGV",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
