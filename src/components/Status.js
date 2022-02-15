import React, { useState, useContext, useEffect } from 'react';
import { AccountContext } from './Accounts';

const Status = (props) => {
    const {status, setStatus} = props;
    const { getSession, logout } = useContext(AccountContext);
    
    /* Get the current user session
    *  Update the status to true if user session is found
    */
    useEffect(() => {
        getSession().then(session => {
            console.log('Session: ', session);
            setStatus(true);
        }).catch(err => {
            console.log('Oops ran into an error: ', err)
            setStatus(false);
        });
        console.log(status);
    }, [status]);

    /* Call the LogOut function and update status */
    const signOut = () => {
        logout();
        setStatus(false);
    }
    
    return (
        <div>
            {status ? (
                <div>
                    <h3>You are logged in</h3>
                    <button onClick={signOut}>Logout</button>
                </div>    
                ) : (
                <div>
                    <h3>Please login below</h3>
                    {props.children}
                </div>
                )}
        </div>
    )
}
export default Status;