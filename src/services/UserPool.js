import { CognitoUserPool } from 'amazon-cognito-identity-js';

const PoolId = process.env.REACT_APP_PoolId;
const ClientId = process.env.REACT_APP_ClientId;

const poolData = {
    UserPoolId: PoolId,
    ClientId: ClientId
  };

export default new CognitoUserPool(poolData);