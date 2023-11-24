import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user && Object.keys(user).length !== 0) {
    return children
  }
  return <Navigate to='/login' replace />
}

export default ProtectedRoute