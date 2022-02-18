import React, { createContext } from 'react'
import AWS from 'aws-sdk'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Pool from '../services/UserPool'

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REACT_APP_REGION
})
const AccountContext = createContext()

function Account (props) {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      // get the current user in the pool
      const user = Pool.getCurrentUser()
      if (user) {
        // get user session info
        user.getSession(async (err, session) => {
          if (err) {
            reject(err)
          } else {
            // get user attributes
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err)
                } else {
                  const results = {}
                  attributes.forEach(attribute => {
                    let { Name, Value } = attribute
                    results[Name] = Value
                  })
                  resolve(results)
                }
              })
            })

            const accessToken = session.accessToken.jwtToken

            const mfaEnabled = await new Promise((resolve, reject) => {
              cognito.getUser(
                {
                  AccessToken: accessToken
                },
                (err, data) => {
                  if (err) {
                    reject(err)
                  } else {
                    resolve(
                      data.UserMFASettingLis &&
                        data.UserMFASettingList.includes('SOFTWARE_TOKEN_MFA')
                    )
                  }
                }
              )
            })

            const token = session.getIdToken().getJwtToken()
            // resolve both user session and attributes
            resolve({
              user,
              accessToken,
              mfaEnabled,
              headers: {
                'x-api-key': attributes['apiKey'],
                Authorization: token
              },
              ...session,
              ...attributes
            })
          }
        })
      } else {
        reject('No user found')
      }
    })

  const authenticate = async (Username, Password) => 
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool })

      const authDetails = new AuthenticationDetails({
        Username,
        Password
      })

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log('onSuccess', data)
          resolve({message: 'SUCCESS', user, data})
        },
        onFailure: err => {
          console.log('onFailure', err)
          reject(err)
        },
        newPasswordRequired: (userAttributes) => {
          // drop unwanted field
          delete userAttributes.email_verified;
          console.log('newPasswordRequired', userAttributes)
          resolve({message: 'newPasswordRequired', user, data: userAttributes})
        },
        mfaRequired: () => {
          const token = prompt('Please enter the 6-digit code from your authenticator app')
          user.sendMFACode(token, {
            onSuccess: () => window.location.href = window.location.href,
            onFailure: ()=> alert('Incorrect code')
          }, 'SOFTWARE_TOKEN_MFA')
        }
      })
    })
  

  const logout = () => {
    const user = Pool.getCurrentUser()
    if (user) {
      user.signOut()
    }
  }

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  )
}

export { AccountContext, Account }
