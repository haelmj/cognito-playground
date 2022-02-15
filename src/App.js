import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import  {Account} from './components/Accounts';
import Status from './components/Status';
import Settings from './components/Settings';
import ForgotPassword from './components/ForgotPassword';

export default () => {
  const [status, setStatus] = useState(false);
  return (
    <Account>
      <Status status={status} setStatus={setStatus}>
        <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            <>
            <Login setStatus={setStatus}/>
            </>
          }/>
          <Route path='/forgot-password' element={
            <ForgotPassword/>
          }/>
          </Routes>
        </BrowserRouter>
      </Status>
      
    </Account>
  )
}
// add settings component