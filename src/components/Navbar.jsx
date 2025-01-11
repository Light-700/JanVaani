import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to log out');
        }
    };

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
                    {user && (
                        <li>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
