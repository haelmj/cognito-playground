import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';

export default (props) => {
    const [status, setStatus] = useState(false);
    const { getSession, logout } = useContext(AccountContext);
    useEffect(() => {
        getSession().then(session => {
            console.log('Session: ', session);
            setStatus(true);
        }).catch(err => {
            console.log('Oops ran into an error: ', err)
            setStatus(false);
        });
    }, []);
    
    return (
        <div>
            {status ? (
                <div>
                    'You are logged in'
                    <button onClick={logout}>Logout</button>
                </div>    
                ) : (
                <div>
                    'Please login below'
                    {props.children}
                </div>
                )}
        </div>
    )
}
