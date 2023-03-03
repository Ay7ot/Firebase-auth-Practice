import { AppActionType, AuthContextType } from "../types/types";

export function authReducer(state: AuthContextType, action: AppActionType): AuthContextType {
    
    switch (action.type) {
    case 'setCurrentUser':
      return {
        ...state,
        currentUser: action.payload?.currentUserPayload ?? null
      };
    case 'setNoUser':
      return {
        ...state,
        currentUser: null
      }
    case 'setSignUpError':
      return {
        ...state,
        signUpError: action.payload?.signUps?.signupErrorPayload ?? ''
      };
    case 'setSignUpEmailParameter':
      return {
        ...state,
        emailParameter: action.payload?.signUps?.emailParameterPayload ?? ''
      };
    case 'setSignUpPasswordParameter':
      return {
        ...state,
        passwordParameter: action.payload?.signUps?.passwordParameterPayload ?? ''
      };
    case 'setSignUpPasswordConfirmParameter':
      return {
        ...state,
        passwordConfirmParameter: action.payload?.signUps?.passwordConfirmParameterPayload ?? ''
      };
      case 'setLogInError':
        return {
          ...state,
          loginError: action.payload?.login?.loginErrorPayload ?? ''
        };
      case 'setNoParameter':
        return {
          ...state,
          emailParameter: '',
          passwordParameter: '',
          passwordConfirmParameter: ''
        }
      case 'setPasswordResetMesssage': 
        return {
          ...state,
          passwordMessage: action.payload?.passwordResetMessagePayload ?? ''
        }
      case 'setUpdateError': 
        return {
          ...state,
          updateEror: action.payload?.updateErrorPayload ?? ''
        }
    default:
      return state;
  }
}