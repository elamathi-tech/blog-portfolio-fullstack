
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgc229nM1b0F4RZbty4XoTTUFYedrqv4s",
  authDomain: "blogportfolioproject.firebaseapp.com",
  projectId: "blogportfolioproject",
  storageBucket: "blogportfolioproject.firebasestorage.app",
  messagingSenderId: "76456412476",
  appId: "1:76456412476:web:2d8f19328bc376929cca39"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;