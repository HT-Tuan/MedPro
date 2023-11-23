import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return children
  }
  return <Navigate to='/login' replace />
}

export default ProtectedRoute