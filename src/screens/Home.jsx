import React from 'react'
import Statistics from '../components/Statistics';
import QuickActions from '../components/QuickActions';

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>JanVaani</h1>
                <p>Empowering Communities, Solving Civic Issues</p>
            </header>
            <Statistics />
            <QuickActions />
        </div>
    );
};

export default Home
