import { CognitoUser } from 'amazon-cognito-identity-js'
import Pool from '../services/UserPool'
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

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
      onSuccess: data => {
        console.log('success', data)
      },
      onFailure: err => {
        console.error('error', err)
      }
    })
  }
  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
      {stage === 1 && (
        <Box component='form' onSubmit={sendCode} sx={{mt:1}}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            placeholder='Email'
            margin='normal'
            required
            fullWidth
          />
          <Button
            variant='contained'
            type='submit'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Send Verification Code
          </Button>
        </Box>
      )}
      {stage === 2 && (
        <>
        <Typography componen='h1' variant='h5'>
        Please login below
      </Typography>
        <Box component='form' onSubmit={resetPassword} sx={{mt:1}}>
          <TextField
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder='Verification Code'
            margin='normal'
            required
            fullWidth
          />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='New Password'
            margin='normal'
            required
            fullWidth
          />
          <TextField
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            type='password'
            placeholder='Confirm Password'
            margin='normal'
            required
            fullWidth
          />
          <Button
            variant='contained'
            type='submit'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
        </>
      )}
      </Box>
    </Container>
  )
}
