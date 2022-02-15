import React, { useEffect, useState, useContext } from 'react'
import { AccountContext } from './Accounts'

const MFA = () => {
  const [userCode, setUserCode] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [image, setImage] = useState('')
  const { getSession } = useContext(AccountContext)

  const getQRCode = () => {
    getSession().then(({ accessToken, headers }) => {
      if (typeof accessToken !== 'string') {
        accessToken = accessToken.jwtToken
      }
      const uri = `${process.env.AUTHENTICATION_URI}/mfa?accessToken=${accessToken}`

      fetch(uri, { headers })
        .then(data => data.json())
        .then(setImage)
        .catch(console.error)
    })
  }
  const enableMFA = (event) => {
    event.preventDefault();

    getSession().then(({user, accessToken, headers }) => {
      if (typeof accessToken !== 'string') {
        accessToken = accessToken.jwtToken
      }
      const uri = `${process.env.AUTHENTICATION_URI}/mfa/enable?accessToken=${accessToken}&userCode=${userCode}`

      fetch(uri, {method: 'POST', headers })
        .then(data => data.json())
        .then(result => {
          if(result.Status && result.Status === 'SUCCESS') {
            setEnabled(true)

            const settings ={
              PrefferedMFA: true,
              Enabled: true
            }
            user.setUserMfaPreference(null, settings, (err) => {
              if (err) console.error(err)
            })
          }
          if(result.errorType === 'InvalidParameterException') {
            console.log('Please use only numbers')
          } else if(result.errorType === 'EnableSoftwareTokenMFAException'){
            console.log('Incorrect 6-digit code')
          }
        })
        .catch(console.error)
  })}
  const disableMFA = () => {}
  return (
    <>
      <div>Multi-factor Authentication</div>
      {enabled ? (
        <div>MFA is enabled already</div>
      ) : image ? (
        <div>
          <h3>Scan this QR Code: </h3>
          <img src={image} alt="QR code" />
          <form onSubmit={enableMFA}>
            <input value={userCode} onChange={e => setUserCode(e.target.value)} placeholder='Insert Code'/>
            <button type="submit">Confirm Code</button>
          </form>
        </div>
      ) : (
        <button onClick={getQRCode}>Get QRCode</button>
      )}
    </>
  )
}
export default MFA
