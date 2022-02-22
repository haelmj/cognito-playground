const { APIGateway, CognitoIdentityServiceProvider } = require('aws-sdk')
require('dotenv').config()

const API = new APIGateway({ region: process.env.REGION })
const cognito = new CognitoIdentityServiceProvider({
  region: process.env.REGION
})

const generateApiKey = async sub => {
  return await new Promise((resolve, reject) => {
    const params = {
      name: `cognito-api-key-${sub}`,
      enabled: true,
      generateDistinctId: true,
      stageKeys: [
        {
          restApiId: process.env.API_ID,
          stageName: process.env.STAGE_NAME
        }
      ]
    }

    API.createApiKey(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const addToPlan = async keyId => {
  return await new Promise((resolve, reject) => {
    const params = {
      keyId,
      keyType: 'API_KEY',
      usagePlanId: process.env.USAGE_PLAN_ID
    }

    API.createUsagePlanKey(params, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

const saveApiKey = async (sub, apikey) => {
  return await new Promise((resolve, reject) => {
    const params = {
      UserPoolId: process.env.USER_POOL_ID,
      Username: sub,
      UserAttributes: [
        {
          Name: 'custom:apiKey',
          Value: apikey
        }
      ]
    }

    cognito.adminUpdateUserAttributes(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

const main = async event => {
  console.log('Event:', event)
  if (!event.request.userAttributes['custom:apiKey']) {
    const { sub } = event
    const { id, value: apiKey } = await generateApiKey(sub)
    await addToPlan(id)
    await saveApiKey(sub, apiKey)
  }
  return event
}

exports.handler = main