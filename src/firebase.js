import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC2VZ7aKqoFDdpKJy9cu6kaAhpcwzDGljE",
    authDomain: "nope-85379.firebaseapp.com",
    databaseURL: "https://nope-85379.firebaseio.com",
    projectId: "nope-85379",
    storageBucket: "nope-85379.appspot.com",
    messagingSenderId: "690824174549",
    appId: "1:690824174549:web:2937b8a89ef87f59fcfb5c",
    measurementId: "G-ES3NML9JWX"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  export default db;
  
