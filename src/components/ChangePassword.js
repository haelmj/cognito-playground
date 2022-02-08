import React, { useState, useContext } from 'react'
import { AccountContext } from './Accounts'

export default () => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { getSession, authenticate } = useContext(AccountContext)

  const onSubmit = e => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    getSession()
      .then(({ user, email }) => {
        authenticate(email, password)
          .then(() => {
            user.changePassword(password, newPassword, err => {
              if (err) {
                alert(err)
              } else {
                alert('Password changed successfully')
              }
            })
          })
          .catch(err => {
            console.err(err)
          })
      })
      .catch(err => {
        console.error(err)
      })
      setConfirmPassword('');
      setNewPassword('');
      setPassword('');
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Current Password'
        />
        <input
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          type='password'
          placeholder='New Password'
        />
        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type='password'
          placeholder='Confirm Password'
        />
        <button type='submit'>Change Password</button>
      </form>
    </div>
  )
}
