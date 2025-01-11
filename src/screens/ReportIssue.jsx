import { useState } from 'react';
import './ReportIssue.css';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        description: '',
        location: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="report-container">
            <h2>Report an Issue</h2>
            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the issue..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter location"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Upload Photo</label>
                    <input type="file" accept="image/*" />
                </div>
                <button type="submit" className="btn btn-primary">Submit Report</button>
            </form>
        </div>
    );
};

export default ReportIssue;