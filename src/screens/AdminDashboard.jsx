import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, 'issues'),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setIssues(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateIssueStatus = async (issueId, newStatus) => {
        try {
            await updateDoc(doc(db, 'issues', issueId), {
                status: newStatus,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="issues-grid">
                {issues.map(issue => (
                    <div key={issue.id} className="issue-card">
                        <h3>{issue.description}</h3>
                        <p>Location: {issue.location}</p>
                        <p>Status: {issue.status}</p>
                        <select
                            value={issue.status}
                            onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;