import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

export default function Signup() {
  
  const { signup, dispatch, signUpError, emailParameter, passwordParameter, passwordConfirmParameter } = useAuth();
  // console.log(emailParameter, passwordParameter, passwordConfirmParameter);  
  
  console.log(signUpError)
  async function handleSignUp(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    
    if (!emailParameter || !passwordParameter || !passwordConfirmParameter){
      return dispatch({
        type: 'setSignUpError',
        payload: {
          signUps: {
            signupErrorPayload: 'Fill out the passwords section'
          }
        }
      })
    } 
    else if (passwordParameter !== passwordConfirmParameter){
      return dispatch({
        type: 'setSignUpError',
        payload: {
          signUps: {
            signupErrorPayload: 'Passwords do not match'
          }
        }
      })
    }
    
    try {
      await signup(emailParameter, passwordParameter)
    } catch {
      return dispatch({
        type: 'setSignUpError',
        payload: {
          signUps: {
            signupErrorPayload: 'Failed to Sign Up'
          }
        }
      })
    }
  }
  
  return (
    <div className='min-h-screen px-8 py-6 max-w-[400px] m-auto'>
      <Navbar />
      <h2 className='text-center mt-20 font-semibold text-[1.7rem] font-sourceSans leading-8'>Sign Up to Vanguard Luxe</h2>
      {signUpError !== '' && <Alert variant='danger'>{signUpError}</Alert>}
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
            onChange={(e)=>{dispatch({
              type: 'setPasswordParameter',
              payload: {
                signUps: {
                  passwordParameterPayload: e.target.value
                }
              }
            })}}
            value={passwordParameter}
          />
          <input 
            type='password'
            className='w-full border-gray-400 searchInput p-2 border-[1px]'
            placeholder='Password Confirmation'
            value={passwordConfirmParameter}
            onChange={e=>{
              return dispatch({
              type: 'setSignUpPasswordConfirmParameter',
              payload: {
                signUps: {
                  passwordConfirmParameterPayload: e.target.value
                }
              }
            })}}
          />
          <button className='w-100 bg-green-500 p-3 text-white  font-sourceSans text-[1.2rem] rounded-md mt-6'>Sign Up</button>
          <p className='mt-4 text-center font-sourceSans text-[1.1rem] text-blue-900'>Already have an account? <Link to='/login' />Log in</p>
       </div>
      </form>
    </div>
  )
}
