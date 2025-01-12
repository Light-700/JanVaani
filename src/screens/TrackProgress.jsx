import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './TrackProgress.css';

const TrackProgress = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const formatDate = (timestamp) => {
        return new Intl.DateTimeFormat('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(timestamp.toDate());
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            const q = query(
                collection(db, 'issues'),
                orderBy('createdAt', 'desc')
            );

            const unsubscribe = onSnapshot(q, 
                (querySnapshot) => {
                    const issuesList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: formatDate(doc.data().createdAt)
                    }));
                    setIssues(issuesList);
                    setLoading(false);
                },
                (error) => {
                    setError('Failed to fetch issues: ' + error.message);
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (err) {
            setError('Error setting up listener: ' + err.message);
            setLoading(false);
        }
    }, [])

    if (loading) return <div className="loading">Loading issues...</div>;
    if (error) return <div className="error">{error}</div>;
    if (issues.length === 0) return <div className="no-issues">No issues reported yet</div>;

    return (
        <div className="track-container">
            <h2>Track Progress</h2>
            <div className="issues-list">
                {issues.map(issue => (
                    <div key={issue.id} className="issue-card">
                        <div className="issue-header">
                            <h3>{issue.description}</h3>
                            <span className={`status status-${issue.status.toLowerCase()}`}>
                                {issue.status}
                            </span>
                        </div>
                        {issue.photoURL && (
                            <div className="issue-photo">
                                <img src={issue.photoURL} alt="Issue" />
                            </div>
                        )}
                        <p className="location">📍 {issue.location}</p>
                        <p className="date">🗓️ {issue.date}</p>
                        <p className="reporter">👤 {issue.userEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackProgress;