import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Dashboard() {
  
  const { currentUser } = useAuth()
  
  if(!currentUser){
    return <Navigate to='/login' />
  }
  
  return (
    <div>
      
    </div>
  )
}
