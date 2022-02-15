import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { AccountContext } from './Accounts'

const Login = ({setStatus}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { authenticate } = useContext(AccountContext)

  const onSubmit = e => {
    e.preventDefault()

    authenticate(email, password)
      .then(data => {
        console.log('Logged in: ', data)
        setStatus(true);
      })
      .catch(err => {
        console.log('Oops ran into an error: ', err)
      })
  }

  return (
    <div>
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