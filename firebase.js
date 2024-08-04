// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDssRC1MlDgEdgrL0vpze8Sm5EJfVc6T0A",
  authDomain: "pantry-e310a.firebaseapp.com",
  projectId: "pantry-e310a",
  storageBucket: "pantry-e310a.appspot.com",
  messagingSenderId: "616094753107",
  appId: "1:616094753107:web:a9e9e2a909b6511f6541a6",
  measurementId: "G-8HY7FJC3WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore=getFirestore(app)
export {firestore}