import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export async function signup(email: string, password: string){
    return await createUserWithEmailAndPassword(auth, email, password)
}

export async function login(email: string, password: string){
    return await signInWithEmailAndPassword(auth, email, password)
}