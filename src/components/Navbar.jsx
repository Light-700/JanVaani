import React from 'react'
import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isAdmin } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to log out');
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className='nav-header'>
            <nav className='navbar'>
                <div className="nav-brand">
                    <NavLink to="/">JanVaani</NavLink>
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><NavLink onClick={() => setIsOpen(false)} className={(e) => { return e.isActive ? "red" : "" }} to="/">Home</NavLink></li>
                    <li><NavLink onClick={() => setIsOpen(false)} className={(e) => { return e.isActive ? "red" : "" }} to="/report">Report Issue</NavLink></li>
                    <li><NavLink onClick={() => setIsOpen(false)} className={(e) => { return e.isActive ? "red" : "" }} to="/track">Track Progress</NavLink></li>
                    <li><NavLink onClick={() => setIsOpen(false)} className={(e) => { return e.isActive ? "red" : "" }} to="/analytics">Analytics</NavLink></li>
                    {isAdmin && (
                        <li>
                            <NavLink onClick={() => setIsOpen(false)} className={(e) => { return e.isActive ? "red" : "" }} to="/admin">Admin Dashboard</NavLink>
                        </li>
                    )}
                    {user && (
                        <>
                            <li><NavLink onClick={() => setIsOpen(false)} className={(e) => { return e.isActive ? "red" : "" }} to="/account">My Account</NavLink></li>
                            <li>
                                <button onClick={handleLogout} className="btn-logout">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
