import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { uploadPhoto } from '../services/photoService';
import { useNavigate } from 'react-router-dom';
import './ReportIssue.css';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        description: '',
        location: '',
        photo: null
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Create issue document
            const issueRef = await addDoc(collection(db, 'issues'), {
                description: formData.description,
                location: formData.location,
                userId: user.uid,
                userEmail: user.email,
                status: 'pending',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            });

            // Upload photo if exists
            if (formData.photo) {
                try {
                    const photoURL = await uploadPhoto(formData.photo, issueRef.id);
                    // Update issue with photo URL
                    await updateDoc(issueRef, {
                        photoURL: photoURL
                    });
                } catch (photoError) {
                    console.error('Error uploading photo:', photoError);
                    setError('Image upload failed, but issue was reported');
                }
            }

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
                        onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                        <div className="photo-preview">
                            <img src={photoPreview} alt="Preview" />
                        </div>
                    )}
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