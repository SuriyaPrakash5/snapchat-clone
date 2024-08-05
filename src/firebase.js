import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyANEPDsm1qm_G3Ggx48j9mWwgXcZ1AhJ20",
    authDomain: "snapchat-clone-9c51b.firebaseapp.com",
    projectId: "snapchat-clone-9c51b",
    storageBucket: "snapchat-clone-9c51b.appspot.com",
    messagingSenderId: "702147051573",
    appId: "1:702147051573:web:49c03961ad75932629317c",
    measurementId: "G-SCW4Q8XHQC"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider(auth)
const storage = getStorage(app)

export { db, auth, storage, provider }