import { useAuth } from '../context/AuthContext';
import './MyAccount.css';

const MyAccount = () => {
    const { user } = useAuth();
    const formatToIST = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);
    };

    return (
        <div className="account-container">
            <div className="account-card">
                <h2>My Account</h2>
                <div className="account-info">
                    <div className="info-group">
                        <label>Email</label>
                        <p>{user?.email}</p>
                    </div>
                    <div className="info-group">
                        <label>Account Created</label>
                        <p>{user?.metadata.creationTime ? formatToIST(user.metadata.creationTime) : '-'}</p>
                    </div>
                    <div className="info-group">
                        <label>Last Login</label>
                        <p>{user?.metadata.lastSignInTime ? formatToIST(user.metadata.lastSignInTime) : '-'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;