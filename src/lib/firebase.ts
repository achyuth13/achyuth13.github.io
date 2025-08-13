import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCJuCvrOcUu_XB47pqeyIuQMhlNfF9L-dw",
  authDomain: "shampions-3eff8.firebaseapp.com",
  projectId: "shampions-3eff8",
  storageBucket: "shampions-3eff8.firebasestorage.app",
  messagingSenderId: "321950832550",
  appId: "1:321950832550:web:a5307ffba338dfcb206167",
  measurementId: "G-YSZEFSR4W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let currentWriteKey: number | null = null;

export function setWriteKey(key: number) {
    currentWriteKey = key;
}

export function getWriteKey(): number | null {
    return currentWriteKey;
}

export function hasValidWriteKey(): boolean {
    const validKeys = [86982, 35512, 88019, 77158, 92727, 23106];
    return currentWriteKey !== null && validKeys.includes(currentWriteKey);
}