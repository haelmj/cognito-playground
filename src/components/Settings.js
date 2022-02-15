import React from 'react'
import ChangePassword from './ChangePassword'
import Header from './Header'

export default function Settings ({ handleLogOut }) {
  return (
    <>
      <Header handleLogOut={handleLogOut} />
      <div>
        <h1>Settings</h1>
        <ChangePassword />
      </div>
    </>
  )
}
