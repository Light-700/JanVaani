import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                setIsAdmin(userDoc.data()?.role === 'admin');
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            }
            setLoading(false);
        };

        checkAdminStatus();
    }, [user]);

    return (
        <AdminContext.Provider value={{ isAdmin, loading }}>
            {!loading && children}
        </AdminContext.Provider>
    );
}