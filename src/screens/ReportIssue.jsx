import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './ReportIssue.css';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        description: '',
        location: '',
        photo: null
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Create issue document
            await addDoc(collection(db, 'issues'), {
                description: formData.description,
                location: formData.location,
                userId: user.uid,
                userEmail: user.email,
                status: 'pending',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                // Add more fields as needed
            });

            // Reset form
            setFormData({
                description: '',
                location: '',
                photo: null
            });

            // Navigate to track page
            navigate('/track');
        } catch (err) {
            setError('Failed to submit report. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-container">
            <h2>Report an Issue</h2>
            {error && <div className="error-message">{error}</div>}
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
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Report'}
                </button>
            </form>
        </div>
    );
};

export default ReportIssue;