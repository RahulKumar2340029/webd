import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAiQoI8j8oJhUpBYsAeOvxcosVKP-qpmug",
  authDomain: "netflix-clone-47b77.firebaseapp.com",
  projectId: "netflix-clone-47b77",
  storageBucket: "netflix-clone-47b77.appspot.com",
  messagingSenderId: "1031066856838",
  appId: "1:1031066856838:web:3856e4489fba556a151007",
  measurementId: "G-GMPW7SG580"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"),{
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) =>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

// const logout = ()=>{
//   signOut(auth);
// }
const logout = async () => {
  try {
    await signOut(auth);
    // Optionally, you can perform additional actions after successful logout
  } catch (error) {
    console.log(error);
    // Handle error if needed
  }
};

export {auth, db, login, signup, logout};