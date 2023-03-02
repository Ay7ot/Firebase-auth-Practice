import React, { ReactNode, useContext, useReducer, useState, useEffect } from "react";
import { auth } from "../firebase";
import { countries } from "../Components/countries";
import { AuthContextType } from "../types/types";
import { authReducer } from "../reducers/reducer";
import { signup, login } from "../functions/functions";

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
                    currentUserPayload: user
                }
            })
            setLoading(false)
       })
       return unsubscribe 
    },[])
    
    return (
        <AuthContext.Provider value={{...mainState, dispatch }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}