import React, { useState, useContext } from 'react'
import { AccountContext } from './Accounts'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { authenticate } = useContext(AccountContext)

  const onSubmit = e => {
    e.preventDefault()

    authenticate(email, password)
      .then(data => {
        console.log('Logged in: ', data)
      })
      .catch(err => {
        console.log('Oops ran into an error: ', err)
      })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} />
        <input value={password} onChange={e => setPassword(e.target.value)} type='password'/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
