import Header from './Header'
import React from 'react'
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Typography, Container, CssBaseline, MenuItem } from '@mui/material'

const pages = [
  {
    name: 'Minerva',
    domain: 'minvera2.principia-data.com'
  },
  {
    name: 'whom_to_invite',
    domain: 'wti.principia-data.com'
  }
]

const Dashboard = ({ handleLogOut }) => {

  const handleSubmit = e => {
    e.preventDefault()
    window.location.href = 'https://' + e.target[0].value
  }
  return (
    <>
      <Header handleLogOut={handleLogOut} />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />

        <Box
          sx={{
            minWidth: 120,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Dashboard
          </Typography>
          <FormControl component='form' onSubmit={handleSubmit} fullWidth>
            <InputLabel htmlFor='dashboard' id='dashboard-label' >
              Select Dashboard:{' '}
            </InputLabel>
            <Select name='dashboard' id='dashboard'>
              {pages.map(page => 
                <MenuItem value={page.domain}>{page.name}</MenuItem>
              )}
            </Select>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              sx={{ mt: 3, mb: 2, backgroundColor: '#f3f3f3', color: 'black', '&:hover': { backgroundColor: 'Grey' } }}
            >
              Go
            </Button>
          </FormControl>
        </Box>
      </Container>
    </>
  )
}
export default Dashboard
