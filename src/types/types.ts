import { User, UserCredential } from "firebase/auth"

export type AuthContextType = {
    currentUser: User | null,
    countries: countriesType[],
    dispatch: React.Dispatch<AppActionType>,
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>;
    signUpError: string;
    emailParameter: string;
    passwordParameter: string;
    passwordConfirmParameter: string;
}

export type AppActionType = {
    type: string;
    payload: {
        currentUserPayload?: User | null,
        signUps?: {
            signupErrorPayload?: string | undefined,
            emailParameterPayload?: string;
            passwordParameterPayload?: string;
            passwordConfirmParameterPayload?: string;
        }
    }
}

export type countriesType = {
    name: string;
    flag: string;
    id: string;
    number: string;
}