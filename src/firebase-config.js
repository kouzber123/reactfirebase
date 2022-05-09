import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCevQaDbzBBeEmgGvH58ewSMDQAHgntxyk",
  authDomain: "reactfirebase-d4aec.firebaseapp.com",
  projectId: "reactfirebase-d4aec",
  storageBucket: "reactfirebase-d4aec.appspot.com",
  messagingSenderId: "295162414226",
  appId: "1:295162414226:web:b630f251fc0a936076124b",
  measurementId: "G-HGJLZ1W22Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
