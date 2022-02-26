const AWS = require('aws-sdk');
require('dotenv').config();

const cognito = new AWS.CognitoIdentityServiceProvider({ region: process.env.REGION });

const validateMFA = async (UserCode, AccessToken) => 
    await new Promise ((resolve, reject) => {
        const params = {
            AccessToken,
            UserCode
        }
    cognito.verifySoftwareToken(params, (err, result)=>{
        if (err) reject(err);
        else resolve(result);
    })
    })

const main = async (event)=> {
    return validateMFA(event.userCode, event.accessToken);
}

exports.handler = main