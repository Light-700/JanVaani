import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import {AdminProvider} from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import Home from "./screens/Home";
import ReportIssue from './screens/ReportIssue';
import TrackProgress from './screens/TrackProgress';
import Analytics from './screens/Analytics';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyAccount from './screens/MyAccount';
import AdminDashboard from './screens/AdminDashboard';
import './App.css'

function App() {
    const router = createBrowserRouter([
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <ProtectedRoute><Navbar /><Home /></ProtectedRoute>
        },
        {
            path: "/report",
            element: <ProtectedRoute><Navbar /><ReportIssue /></ProtectedRoute>
        },
        {
            path: "/track",
            element: <ProtectedRoute><Navbar /><TrackProgress /></ProtectedRoute>
        },
        {
            path: "/analytics",
            element: <ProtectedRoute><Navbar /><Analytics /></ProtectedRoute>
        },
        {
            path: "/account",
            element: <ProtectedRoute><Navbar /><MyAccount /></ProtectedRoute>
        },
        {
            path: "/admin",
            element: (
                <ProtectedRoute>
                    <AdminRoute>
                        <Navbar />
                        <AdminDashboard />
                    </AdminRoute>
                </ProtectedRoute>
            )
        }
    ]);

    return (
        <AuthProvider>
            <AdminProvider>
                <RouterProvider router={router} />
            </AdminProvider>
        </AuthProvider>
    )
}

export default App
