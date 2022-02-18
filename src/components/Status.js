import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AccountContext } from './Accounts'
import Dashboard from './Dashboard'
import Settings from './Settings'
import ForgotPassword from './ForgotPassword'
import Login from './Login'


/**
 * Verify if user is logged in and redirect to dashboard if so;
 * otherwise, redirect to login page.
 */
const Status = () => {
  const [status, setStatus] = useState(false)
  const { getSession, logout } = useContext(AccountContext)

  /* Get the current user session
   *  Update the status to true if user session is found
   */
  useEffect(() => {
    getSession()
      .then(session => {
        console.log('Session: ', session)
        setStatus(true)
      })
      .catch(err => {
        console.log('Oops ran into an error: ', err)
        setStatus(false)
      })
    console.log(status)
  })

  /* Call the LogOut function and update status */
  const handleLogOut = () => {
    logout()
    setStatus(false)
  }

  return (
    <BrowserRouter>
        <Routes>
        <Route exact path='/login' element={!status? <Login setStatus={setStatus} /> : <Navigate to='/'/>} />
        <Route exact path='/forgot-password' element={!status? <ForgotPassword /> : <Navigate to='/'/>} />
        <Route exact path='/' element={status ? <Dashboard handleLogOut={handleLogOut}/>: <Navigate to='/login'/>} />
        <Route exact path='/settings' element={status ? <Settings handleLogOut={handleLogOut} />: <Navigate to='/login'/>} />
        </Routes>
    </BrowserRouter>
  )
}
export default Status
