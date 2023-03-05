import { updateEmail, updatePassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { useAuth } from "../Contexts/AuthContext"
import { auth, db } from "../firebase"
import { ref, set } from "firebase/database"

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

export function updateUserEmail(currentUser: User, email: string){
    return updateEmail(currentUser, email)
}

export function updateUserPassword(currentUser: User, password: string){
    return updatePassword(currentUser, password)
}

export function createUserOnDataBase(email: string, password: string){
    const reference = ref(db, 'users/' + email);
    
    set(
        reference,
        {
            email: email,
            password: password
        }
    )
}