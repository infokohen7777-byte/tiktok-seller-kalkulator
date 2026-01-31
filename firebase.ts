import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqe0BYEivXcysWFtzrpLNeT4KHWsA7dUw",
  authDomain: "kalkulator-toko.firebaseapp.com",
  projectId: "kalkulator-toko",
  storageBucket: "kalkulator-toko.appspot.com",
  messagingSenderId: "652271428472",
  appId: "1:652271428472:web:58b29b64ad65326de25e8d",
  measurementId: "G-02HDSL2G1Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };