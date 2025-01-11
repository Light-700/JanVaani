import { Link } from 'react-router-dom';
import './QuickActions.css';

const QuickActions = () => {
    return (
        <div className="quick-actions">
            <Link to="/report" className="action-btn">
                <span className="icon">📝</span>
                <span>Report an Issue</span>
            </Link>
            <Link to="/track" className="action-btn">
                <span className="icon">📊</span>
                <span>Track Progress</span>
            </Link>
            <Link to="/analytics" className="action-btn">
                <span className="icon">📈</span>
                <span>View Leaderboard</span>
            </Link>
        </div>
    );
};

export default QuickActions;