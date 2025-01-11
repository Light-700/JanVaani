import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import ReportIssue from './screens/ReportIssue';
import TrackProgress from './screens/TrackProgress';
import Analytics from './screens/Analytics';
import './App.css'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <><Navbar /><Home /></>
        },
        {
            path: "/dashboard",
            element: <><Navbar /><Dashboard /></>
        },

        {
            path: "/report",
            element: <><Navbar /><ReportIssue /></>
        },
        {
            path: "/track",
            element: <><Navbar /><TrackProgress /></>
        },
        {
            path: "/analytics",
            element: <><Navbar /><Analytics /></>
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
