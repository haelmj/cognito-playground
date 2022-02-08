import React, { useContext, useState, useEffect } from 'react'
import { AccountContext } from './Accounts'
import ChangePassword from './ChangePassword'

export default function Settings (props) {
  const { getSession } = useContext(AccountContext)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    getSession().then(() => {
      setLoggedIn(true)
    }).catch(() => {
      console.log('No session found')
    })
  }, [])

  return (
    <div>
      {loggedIn && (
        <>
          <h1>Settings</h1>
          <ChangePassword />
        </>
      )}
    </div>
  )
}
