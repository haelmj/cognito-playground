import React, { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AccountContext } from './Accounts'

const Login = ({setStatus, setUser, setUserAttributes, setNewPasswordRequired}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { authenticate } = useContext(AccountContext)

  const onSubmit = e => {
    e.preventDefault()

    authenticate(email, password)
      .then(({message, user, data}) => {
        console.log('Logged in: ', {message, user, data})
        switch(message) {
          case 'SUCCESS':
            setStatus(true)
            navigate('/enable-mfa')
            break
          case 'newPasswordRequired':
            setNewPasswordRequired(true)
            setUser(user)
            setUserAttributes(data)
            navigate('/change-password-required')
            break
          case 'mfaRequired':
            break
        }
      })
      .catch(err => {
        console.log('Oops ran into an error: ', err)
      })
  }

  return (
    <div>
      <h3>Please login below</h3>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' required/>
        <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' required/>
        <button type='submit'>Login</button><br/>
      </form>
      <Link to='/forgot-password'>Forgot Password?</Link>
    </div>
  )
}
export default Login;