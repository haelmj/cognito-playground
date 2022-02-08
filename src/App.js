import React, {useState} from 'react'
import Login from './components/Login';
import  {Account} from './components/Accounts';
import Status from './components/Status';
import Settings from './components/Settings';
import ForgotPassword from './components/ForgotPassword';

export default () => {
  return (
    <Account>
      <Status>
        <Login />
        <ForgotPassword />
      </Status>
      <Settings/>
    </Account>
  )
}
