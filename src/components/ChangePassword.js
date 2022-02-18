import React, { useState, useContext } from 'react'
import { AccountContext } from './Accounts'
import { useNavigate } from 'react-router-dom'

const ChangePassword = (props) => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate();

  const { getSession, authenticate } = useContext(AccountContext)

  /**on submit if the User was signed up by an admin and needs to provide new password*/
  const onUserSubmit = e => {
    e.preventDefault()

    let {user, userAttributes, setNewPasswordRequired}= props

    userAttributes.name = name;
    user.completeNewPasswordChallenge(newPassword, userAttributes, {
      onFailure: err => console.log(err),
      onSuccess: () => alert('Password changed successfully')
    });
    setNewPasswordRequired(false);
    navigate('/')
    
  }

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
      <form onSubmit={props.user ? onUserSubmit : onSubmit}>
        {!props.user && <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Current Password'
          required
        />}
        <input
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          type='password'
          placeholder='New Password'
          required
        />
        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type='password'
          placeholder='Confirm Password'
          required
        />
        {props.user && <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' required />}
        <button type='submit'>Change Password</button>
      </form>
    </div>
  )
}
export default ChangePassword