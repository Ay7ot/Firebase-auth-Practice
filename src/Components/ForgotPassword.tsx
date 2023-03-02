import React, { useEffect } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from './Navbar'
import { Link, Navigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { resetPassword } from '../functions/functions'

export default function ForgotPassword() {
  
  const { currentUser, dispatch, emailParameter, resetPassword, passwordMessage } = useAuth();
  // console.log(emailParameter, passwordParameter, passwordConfirmParameter);  
  
  useEffect(() => {
    dispatch({
      type: 'setPasswordResetMesssage',
      payload: {
        passwordResetMessagePayload: ''
      }
    })
    dispatch({
      type: 'setNoParameter',
    })
  }, [])
  
  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    
    if (!emailParameter){
      return dispatch({
        type: 'setPasswordResetMesssage',
        payload: {
          passwordResetMessagePayload: 'Enter a valid email'
        }
      })
    } 
    
    try {
      dispatch({
        type: 'setNoUser'
      })
      await resetPassword(emailParameter)
      dispatch({
        type: 'setPasswordResetMesssage',
        payload: {
          passwordResetMessagePayload: 'Email Sent to your Mailbox'
        }
      })
      
    } catch {
      return dispatch({
        type: 'setLogInError',
        payload: {
          login: {
            loginErrorPayload: 'Failed to Login'
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
      <h2 className='text-center mt-20 font-semibold text-[1.7rem] font-sourceSans leading-8'>Reset Password</h2>
      {passwordMessage !== '' && <Alert variant={passwordMessage === 'Email Sent to your Mailbox' ? 'success' : 'danger'}>{passwordMessage}</Alert>}
      <form onSubmit={handleResetPassword}>
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
          <button className='w-100 bg-green-500 p-3 text-white  font-sourceSans text-[1.2rem] rounded-md mt-2'>Send Email</button>
          <p className='text-center'>Already have an account? <Link to='/login'>Log In</Link></p>
       </div>
      </form>
    </div>
  )
}
