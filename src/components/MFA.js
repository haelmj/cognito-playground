import React,{useEffect, useState, useContext} from 'react';
import {AccountContext} from './Accounts';

export default ()=> {
    const [userCode, setUserCode]=useState('');
    const [enabled, setEnabled]=useState(false);
    const [image, setImage]=useState('');
    const {getSession} = useContext(AccountContext);

    const getQRCode = ()=>{};
    const enableMFA = ()=>{};
    const disableMFA = ()=>{};
  return (
    <>
      <div>MFA</div>

      <button onClick={getQRCode}>Get QRCode</button>
    </>
  )
}