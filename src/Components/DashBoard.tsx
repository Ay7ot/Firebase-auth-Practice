import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { logout } from '../functions/functions'

export default function Dashboard() {
  
  const { currentUser, dispatch } = useAuth()
  
  console.log(currentUser)
  
 
  
  if(!currentUser){
    return <Navigate to='/login' />
  }
  
  return (
    <div className='flex items-center min-h-screen justify-center'>
      <Card>
        <Card.Body>
          <p className='text-semibold text-[1.2rem]'>Username: <span>{currentUser.email}</span></p>
          <div className='flex justify-between mx-14'>
            <button className='p-2 bg-green-500 rounded-lg text-white'><Link to='updateProfile' className='text-white no-underline'>Update Profile</Link></button>
            <button className='p-2 bg-green-500 rounded-lg text-white' onClick={()=>logout()}>Logout</button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
