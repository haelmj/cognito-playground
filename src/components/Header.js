import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({handleLogOut}) => {
  return (
    <div className='header'>
        <Link to='/'>Home</Link>
        <Link to='/settings'>Settings</Link>
        <button onClick={handleLogOut}>Logout</button>
    </div>
  )
}
export default Header