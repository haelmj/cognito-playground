import React, { useEffect, useState, useContext } from 'react'
import { AccountContext } from './Accounts'
import { useNavigate } from 'react-router-dom'

const MFA = ({enabled, setEnabled}) => {
  const [userCode, setUserCode] = useState('')
  
  const [image, setImage] = useState('')
  const { getSession } = useContext(AccountContext)
  const navigate = useNavigate()


  useEffect(() => {
    getSession().then(({mfaEnabled})=>{
      setEnabled(mfaEnabled)
    })
  })


  /**
   * @function getQRCode
   * @description Get the QR code for the user's MFA and update the image state
   * @returns {void}
   */
  const getQRCode = () => {
    getSession().then(({ accessToken, headers }) => {
      if (typeof accessToken !== 'string') {
        accessToken = accessToken.jwtToken
      }
      const uri = `${process.env.REACT_APP_AUTHENTICATION_URI}/mfa?accessToken=${accessToken}`

      fetch(uri, { headers })
        .then(data => data.json())
        .then(setImage)
        .catch(console.error)
    })
  }

  /**
   * @function enableMFA
   * @description Send the user's code and access token to the cognito server to enable MFA; Update the user's MFA settings
   * @returns {void} 
   */
  const enableMFA = (event) => {
    event.preventDefault();

    getSession().then(({user, accessToken, headers }) => {
      if (typeof accessToken !== 'string') {
        accessToken = accessToken.jwtToken
      }
      const uri = `${process.env.REACT_APP_AUTHENTICATION_URI}/mfa?accessToken=${accessToken}&userCode=${userCode}`

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
  console.log('MFA STATUS', enabled)
  return (
    <>
      <div>Multi-factor Authentication</div>
      {enabled ? navigate('/') : image ? (
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
