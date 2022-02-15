import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Dashboard = ({handleLogOut}) => {

    return (
        <>
            <Header handleLogOut={handleLogOut} />
            <div>
            <h1>Dashboard</h1>
            <label htmlFor="dashboard">Select Dashboard: </label>
            <select name='dashboard' id='dashboard'>
                <option value='dashboard1'>Dashboard 1</option>
                <option value='dashboard2'>Dashboard 2</option>
            </select>
            </div>
        </>
    )
}
export default Dashboard