import React, { createContext } from 'react'
import AWS from 'aws-sdk'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import Pool from '../services/UserPool'

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.REACT_APP_REGION
})
const AccountContext = createContext()

const createApiKey = async (sub, token) => {
  const response = await fetch(
    `${process.env.REACT_APP_AUTHENTICATION_URI}/generate-key?sub=${sub}`,
    { method: 'POST', headers: { Authorization: token } }
  )

  return response
}

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
            console.log(attributes)
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
                'x-api-key': attributes['custom:apiKey'],
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
          if (!data.idToken.payload['custom:apiKey']) {
            createApiKey(
              data.idToken.payload['cognito:username'],
              data.idToken.jwtToken
            ).then(resolve({ message: 'SUCCESS', user, data }))
          }
        },
        onFailure: err => {
          console.log('onFailure', err)
          reject(err)
        },
        newPasswordRequired: data => {
          // drop unwanted field
          delete data.email_verified
          console.log('newPasswordRequired', data)
          resolve({ message: 'newPasswordRequired', user, data })
        },
        mfaRequired: () => {
          const token = prompt(
            'Please enter the 6-digit code from your authenticator app'
          )
          user.sendMFACode(
            token,
            {
              onSuccess: () => (window.location.href = window.location.href),
              onFailure: () => alert('Incorrect code')
            },
            'SOFTWARE_TOKEN_MFA'
          )
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

export { AccountContext, Account, createApiKey }
