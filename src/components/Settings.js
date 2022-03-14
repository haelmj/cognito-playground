import React from 'react'
import ChangePassword from './ChangePassword'
import Header from './Header'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'

export default function Settings ({ handleLogOut }) {
  return (
    <>
      <Header handleLogOut={handleLogOut} />
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
          Settings
        </Typography>
        <ChangePassword />
      </Box>
      </Container>
    </>
  )
}
