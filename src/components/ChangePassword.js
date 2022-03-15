import React, { useState, useContext } from 'react'
import { AccountContext } from './Accounts'
import { useNavigate } from 'react-router-dom'
import { createApiKey } from './Accounts'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/material'

const ChangePassword = props => {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const { getSession, authenticate } = useContext(AccountContext)

  /**on submit if the User was signed up by an admin and needs to provide new password*/
  const onUserSubmit = e => {
    e.preventDefault()

    let { user, userAttributes, setNewPasswordRequired } = props

    userAttributes.name = name
    user.completeNewPasswordChallenge(newPassword, userAttributes, {
      onFailure: err => console.log(err),
      onSuccess: session => {
        createApiKey(
          session.idToken.payload['cognito:username'],
          session.idToken.jwtToken
        ).then(() => {
          alert('Password Change Successful!')
          setNewPasswordRequired(false)
          navigate('/enable-mfa')
        })
      }
    })
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
    setConfirmPassword('')
    setNewPassword('')
    setPassword('')
  }
  return (
    <Box
      component='form'
      onSubmit={props.user ? onUserSubmit : onSubmit}
      sx={{ mt: 1 }}
    >
      {!props.user && (
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          placeholder='Current Password'
          required
          fullWidth
        />
      )}
      <TextField
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        type='password'
        placeholder='New Password'
        required
        fullWidth
      />
      <TextField
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        type='password'
        placeholder='Confirm Password'
        required
        fullWidth
      />
      {props.user && (
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Name'
          required
          fullWidth
        />
      )}
      <Button
        variant='contained'
        fullWidth
        type='submit'
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: '#f3f3f3',
          color: 'black',
          '&:hover': { backgroundColor: 'Grey' }
        }}
      >
        Change Password
      </Button>
    </Box>
  )
}
export default ChangePassword
