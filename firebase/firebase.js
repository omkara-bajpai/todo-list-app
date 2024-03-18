import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAOEOrbQdze0LVTaqekmpmkRUF5iVYTGUM",
  authDomain: "todo-list-app-firebase-6a1d4.firebaseapp.com",
  projectId: "todo-list-app-firebase-6a1d4",
  storageBucket: "todo-list-app-firebase-6a1d4.appspot.com",
  messagingSenderId: "343456628177",
  appId: "1:343456628177:web:9611303650cea56f0d34f0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
