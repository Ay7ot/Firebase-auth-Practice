import { User, UserCredential } from "firebase/auth"

export type AuthContextType = {
    currentUser: User | null,
    countries: countriesType[],
    dispatch: React.Dispatch<AppActionType>,
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    signUpError: string;
    emailParameter: string;
    passwordParameter: string;
    passwordConfirmParameter: string;
    loginError: string,
    passwordMessage: string;
}

export type AppActionType = {
    type: string;
    payload?: {
        currentUserPayload?: User | null,
        signUps?: {
            signupErrorPayload?: string,
            emailParameterPayload?: string;
            passwordParameterPayload?: string;
            passwordConfirmParameterPayload?: string;
        };
        login?:{
            loginErrorPayload?: string,
            emailParameterPayload?: string;
            passwordParameterPayload?: string;
        }
        passwordResetMessagePayload?: string
    }
}

export type countriesType = {
    name: string;
    flag: string;
    id: string;
    number: string;
}