import React, {useState} from 'react'
import Login from './components/Login';
import Signup from './components/Signup';
import  {Account} from './components/Accounts';
import Status from './components/Status';

export default () => {
  return (
    <Account>
      <Status>
        <Login />
      </Status>
    </Account>
  )
}
