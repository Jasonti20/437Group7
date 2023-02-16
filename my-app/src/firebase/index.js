import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkbiyfmp7Vh_E46DaWZQMFvq50rH3KmIo",
  authDomain: "cse437-7f5fc.firebaseapp.com",
  projectId: "cse437-7f5fc",
  storageBucket: "cse437-7f5fc.appspot.com",
  messagingSenderId: "1061475714554",
  appId: "1:1061475714554:web:70d8dd36e2c98fb5b81043",
  measurementId: "G-DCWP4PVWQQ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
