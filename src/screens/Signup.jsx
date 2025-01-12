import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createUserProfile } from '../services/userService';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Reusing login styles
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('citizen');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!displayName) {
            setError('Display name is required');
            return;
        }
        try {
            setError('');
            const userCredential = await signup(email, password);
            await createUserProfile(userCredential.user.uid, {
                email,
                role,
                name: displayName
            });
            navigate('/');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'Failed to create an account');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Display Name</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="citizen">Citizen</option>
                        <option value="admin">Authority</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;