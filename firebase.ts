import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBj3TkUEzCqJEpCVUUT0t5q396rNa-VCq0",
   authDomain: "chat-to-pdf-paulo.firebaseapp.com",
   projectId: "chat-to-pdf-paulo",
   storageBucket: "chat-to-pdf-paulo.firebasestorage.app",
   messagingSenderId: "127661685798",
   appId: "1:127661685798:web:96cf26a2701c929b39fae7"
};

// Initialize Firebase, if there is not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Connect to the firestore database
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }