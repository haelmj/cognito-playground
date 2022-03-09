import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import { AccountContext } from './Accounts'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'


const Login = ({
  setStatus,
  setUser,
  setUserAttributes,
  setNewPasswordRequired
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { authenticate } = useContext(AccountContext)

  const onSubmit = e => {
    e.preventDefault()

    authenticate(email, password)
      .then(({ message, user, data }) => {
        console.log('Logged in: ', { message, user, data })
        switch (message) {
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
          case 'totpRequired':
            const token = prompt(
              'Please enter the 6-digit code from your authenticator app'
            )
            user.sendMFACode(
              token,
              {
                onSuccess: () => navigate('/'),
                onFailure: () => alert('Incorrect code')
              },
              'SOFTWARE_TOKEN_MFA'
            )
            break
        }
      })
      .catch(err => {
        console.log('Oops ran into an error: ', err)
      })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component='h1' variant='h5'>
          Please login below
        </Typography>
        <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            margin='normal'
            required
            fullWidth
          />
          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            margin='normal'
            required
            fullWidth
          />
          <Button
            variant='contained'
            type='submit'
            fullWidth
            sx={{ mt: 3, mb: 2, backgroundColor: '#f3f3f3', color: 'black', '&:hover': { backgroundColor: 'Grey' } }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
export default Login
