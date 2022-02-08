import React, {useState} from 'react'
import Login from './components/Login';
import  {Account} from './components/Accounts';
import Status from './components/Status';
import Settings from './components/Settings';

export default () => {
  return (
    <Account>
      <Status>
        <Login />
      </Status>
      <Settings/>
    </Account>
  )
}
