import React, { useEffect } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from './Navbar'
import { Link, Navigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

export default function Login() {
  
  const { currentUser, login, dispatch, loginError, emailParameter, passwordParameter } = useAuth();
  // console.log(emailParameter, passwordParameter, passwordConfirmParameter);  
  
  useEffect(() => {
    dispatch({
      type: 'setLogInError',
      payload: {
        login: {
          loginErrorPayload: ''
        }
      }
    })
    dispatch({
      type: 'setNoParameter',
    })
  }, [])
  
  console.log(loginError, emailParameter, passwordParameter)
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    
    if (!emailParameter || !passwordParameter){
      return dispatch({
        type: 'setLogInError',
        payload: {
          login: {
            loginErrorPayload: 'Complete the form'
          }
        }
      })
    } 
    
    try {
      dispatch({
        type: 'setNoUser'
      })
      await login(emailParameter, passwordParameter)
    } catch {
      return dispatch({
        type: 'setLogInError',
        payload: {
          login: {
            loginErrorPayload: 'Email or password Incorrect'
          }
        }
      })
    }
  }

  if(currentUser){
    return <Navigate to='/' />
  }
  
  return (
    <div className='min-h-screen px-8 py-6 max-w-[400px] m-auto'>
      <Navbar />
      <h2 className='text-center mt-20 font-semibold text-[1.7rem] font-sourceSans leading-8'>Sign Up to Vanguard Luxe</h2>
      {loginError !== '' && <Alert variant='danger'>{loginError}</Alert>}
      <form onSubmit={handleSignUp}>
       <div className='flex flex-col gap-3 mt-6'>
          <input 
            type='email'
            className='w-full border-gray-400 searchInput p-2 border-[1px]'
            placeholder='Email'
            value={emailParameter}
            name='emailParameter'
            onChange={(e)=>{
              return dispatch({
              type: 'setSignUpEmailParameter',
              payload: {
                signUps: {
                  emailParameterPayload: e.target.value
                }
              }
            })}}
          />
         <input 
            type='password'
            className='w-full border-gray-400 searchInput p-2 border-[1px]'
            placeholder='Password'
            value={passwordParameter}
            name={passwordParameter}
            onChange={(e)=>{
              return dispatch({
              type: 'setSignUpPasswordParameter',
              payload: {
                signUps: {
                  passwordParameterPayload: e.target.value
                }
              }
            })}}
          />
          <Link to='/forgotPassword'>Forgot Password?</Link>
          <button className='w-100 bg-green-500 p-3 text-white  font-sourceSans text-[1.2rem] rounded-md mt-6'>Log In</button>
          <p className='mt-4 text-center font-sourceSans text-[1.1rem] text-blue-900'>Need an account? <Link to='/signup'>Sign Up</Link></p>
       </div>
      </form>
    </div>
  )
}
