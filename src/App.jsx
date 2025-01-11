import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import ReportIssue from './screens/ReportIssue';
import TrackProgress from './screens/TrackProgress';
import Analytics from './screens/Analytics';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyAccount from './screens/MyAccount';
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
            path: "/dashboard",
            element: <ProtectedRoute><Navbar /><Dashboard /></ProtectedRoute>
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
        }
    ]);

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App
