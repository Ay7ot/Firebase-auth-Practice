import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase"

export async function signup(email: string, password: string){
    return await createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email: string, password: string){
    return await signInWithEmailAndPassword(auth, email, password)
}

export  function logout(){
    return signOut(auth)
}

export async function resetPassword(email: string){
    return await sendPasswordResetEmail(auth, email)
}