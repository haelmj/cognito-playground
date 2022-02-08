import React, { useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'
import Pool from '../services/UserPool'

export default function ForgotPassword (props) {
  const [stage, setStage] = useState(1) // 1: email stage; 2: code stage
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const getUser = () => {
    return new CognitoUser({ Username: email.toLowerCase(), Pool })
  }

  const sendCode = e => {
    e.preventDefault()

    getUser().forgotPassword({
      onSuccess: data => {
        console.log('onSuccess', data)
      },
      onFailure: err => {
        console.error(err)
      },
      inputVerificationCode: data => {
        // User was verified, now they must choose a new password
        console.log(data)
        setStage(2)
      }
    })
  }

  const resetPassword = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    getUser().confirmPassword(code, password, {
        onSuccess: data => {console.log('success', data)},
        onFailure: err => {console.error('error', err)}
    })
  }
  return (
    <>
      {stage === 1 && (
        <form onSubmit={sendCode}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
          />
          <button type='submit'>Send Verification Code</button>
        </form>
      )}
      {stage === 2 && (
        <form onSubmit={resetPassword}>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder='Verification Code'
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='New Password'
          />
          <input
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm Password'
          />
          <button type='submit'>Reset Password</button>
        </form>
      )}
    </>
  )
}
