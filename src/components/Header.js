import '../styles/header.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

const Header = ({ handleLogOut }) => {
  return (
    <AppBar
      position='static'
      className='header'
      style={{ backgroundColor: '#f3f3f3' }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'black' }}
          >
            Principia
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              float: 'right'
            }}>
            <Link to='/' className='header-item'>
              Home
            </Link>
            <Link to='/settings' className='header-item'>
              Settings
            </Link>
            <Button
              onClick={handleLogOut}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
