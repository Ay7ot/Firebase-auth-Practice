import React, { ReactNode, useContext, useReducer, useState, useEffect } from "react";
import { auth } from "../firebase";
import { countries } from "../Components/countries";
import { AuthContextType } from "../types";
import { authReducer } from "../reducers/reducer";
import { signup, login } from "../Components/functions/functions";

const AuthContext = React.createContext<AuthContextType>({
    currentUser: null,
    countries: countries,
    signup,
    login,
    dispatch: () => {},
    signUpError: '',
    emailParameter: '',
    passwordParameter: '',
    passwordConfirmParameter: ''
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    
    const value = useAuth()
    
    const [loading, setLoading] = useState(true);
    const [mainState, dispatch] = useReducer(authReducer, value)

    
    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user=>{
            dispatch({
                type: 'setCurrentUser',
                payload: {
                    currentUserPayload: user,
                    signUps: {}
                }
            })
            setLoading(false)
       })
       return unsubscribe 
    },[])
    
    return (
        <AuthContext.Provider value={mainState}>
            {!loading && children}
        </AuthContext.Provider>
    )
}