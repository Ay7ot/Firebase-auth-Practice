import React from 'react'
import { useAuth } from '../Contexts/AuthContext'

export default function Login() {
  
  const { currentUser } = useAuth()
  
  return (
    <div>
      Login Page
    </div>
  )
}
