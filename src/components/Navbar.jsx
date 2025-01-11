import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {


    return (
        <header className='nav-header'>
            <nav className='navbar'>
                <div className="nav-brand">
                    <NavLink to="/">JanVaani</NavLink>
                </div>
                <ul className="nav-links">
                    <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/">Home</NavLink></li>
                    <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/report">Report Issue</NavLink></li>
                    <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/track">Track Progress</NavLink></li>
                    <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/analytics">Analytics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
