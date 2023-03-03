import React, { useEffect } from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from './Navbar'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { updateUserEmail, updateUserPassword } from '../functions/functions'

export default function UpdateProfile() {
  
  const { currentUser, updateEror, dispatch, signUpError, emailParameter, passwordParameter, passwordConfirmParameter } = useAuth();
  const history = useNavigate();
  
  useEffect(() => {
    dispatch({
      type: 'setUpdateError',
      payload: {
        updateErrorPayload: ''
      }
    })
    dispatch({
      type: 'setNoParameter',
    })
  }, [])
  
  function handleUpdateProfile(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    
    if (passwordParameter !== passwordConfirmParameter){
      return dispatch({
        type: 'setUpdateError',
        payload: {
          updateErrorPayload: 'Passwords do not match'
        }
      })
    } 
    
    const promises = []
    
    dispatch({
      type: 'setUpdateError',
      payload: {
        updateErrorPayload: ''
      }
    })
    
    if(emailParameter !== '' && currentUser !== null && emailParameter !== currentUser.email){
      promises.push(updateUserEmail(currentUser, emailParameter))
    }
    if(passwordParameter !== '' && currentUser !== null){
      promises.push(updateUserPassword(currentUser, passwordParameter))
    }
    
    Promise.all(promises).then(()=>{
      history('/')
    }).catch(()=>{
      dispatch({
        type: 'setUpdateError',
        payload: {
          updateErrorPayload: 'Failed to update account info'
        }
      })
    })
  }
  
  if(!currentUser){
    return <Navigate to='/login' />
  }
  
  return (
    <div className='min-h-screen px-8 py-6 max-w-[400px] m-auto'>
      <Navbar />
      <h2 className='text-center mt-20 font-semibold text-[1.7rem] font-sourceSans leading-8'>Sign Up to Vanguard Luxe</h2>
      {updateEror !== '' && <Alert variant='danger'>{updateEror}</Alert>}
      <h5 className='text-center mt-3'>Leave password blank to keep same</h5>
      <form onSubmit={handleUpdateProfile}>
       <div className='flex flex-col gap-3 mt-6'>
          <input 
            type='email'
            className='w-fullhan border-gray-400 searchInput p-2 border-[1px]'
            placeholder='Email'
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
            defaultValue={currentUser.email || ''}
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
          <input 
            type='password'
            className='w-full border-gray-400 searchInput p-2 border-[1px]'
            placeholder='Password Confirmation'
            value={passwordConfirmParameter}
            name={passwordConfirmParameter}
            onChange={(e)=>{
              return dispatch({
              type: 'setSignUpPasswordConfirmParameter',
              payload: {
                signUps: {
                  passwordConfirmParameterPayload: e.target.value
                }
              }
            })}}
          />
          <button className='w-100 bg-green-500 p-3 text-white  font-sourceSans text-[1.2rem] rounded-md mt-6'>Update Profile</button>
          <p className='mt-4 text-center font-sourceSans text-[1.1rem] text-blue-900'><Link to='/login'>Cancel</Link></p>
       </div>
      </form>
    </div>
  )
}
