import './TrackProgress.css';

const TrackProgress = () => {
    const issues = [
        {
            id: 1,
            description: "Broken streetlight",
            location: "Main Street",
            status: "Pending",
            date: "2024-03-15",
        },
        // Add more sample issues
    ];

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
                        <p className="location">📍 {issue.location}</p>
                        <p className="date">🗓️ {issue.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackProgress;