const AWS = require('aws-sdk');
const QR = require('qrcode');

const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'region'});

const getQRCode = async (AccessToken) => await new Promise((resolve, reject) => {
    cognito.associateSoftwareToken({
        AccessToken
    }, (err, data) => {
        if (err) {
            console.log('Error:', err);
            reject(err);
        } else {
            const name = "Principia Dashboard";
            const uri = `otpauth://totp/${decodeURI(name)}?secret=${data.SecretCode}&issuer=${name}`;
            console.log(uri)

            QR.toDataURL(uri, (err, url) => {
                if (err) {
                    console.log('Error:', err);
                    reject(err);
                } else {
                    resolve(url);
                }
            })
        }
    });
});

const main = async(event)=>{
    console.log('Event:', event);
    return getQRCode(event.accessToken);
};

exports.handler = main