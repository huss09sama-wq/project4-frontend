import React from 'react';
import { Link } from 'react-router';

const Homepage = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="container">
            <div className="hero-section">
                <span className="hero-badge">// PRODUCTION PIPELINE READY</span>
                <h1 className="hero-title">The Developer's Personal Code Infrastructure</h1>
                <p className="hero-subtitle">
                    A high-performance central repository built to organize source code assets, document execution blueprints, and manage logic pipelines in real-time.
                </p>
                <div className="hero-actions">
                    {isLoggedIn ? (
                        <Link to="/dashboard"><button className="btn-success">Go To Dashboard →</button></Link>
                    ) : (
                        <>
                            <Link to="/sign-up"><button className="btn-success">Deploy Account</button></Link>
                            <Link to="/sign-in"><button className="btn-primary" style={{ marginLeft: '15px' }}>Access Terminal</button></Link>
                        </>
                    )}
                </div>
            </div>

            <div className="grid-3">
                <div className="card feature-card">
                    <div className="feature-icon">📁</div>
                    <h3>Modular Repositories</h3>
                    <p>Categorize core functions, hooks, middleware, and algorithms into clean, searchable infrastructure sections.</p>
                </div>

                <div className="card feature-card">
                    <div className="feature-icon">⚙️</div>
                    <h3>Execution Blueprints</h3>
                    <p>Map out the internal logic flow step-by-step alongside your code to make future debugging instantaneous.</p>
                </div>

                <div className="card feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Database Synchronized</h3>
                    <p>Full CRUD state capabilities securely linked to your profile database for workspace persistence across screens.</p>
                </div>
            </div>

            <div className="card terminal-preview">
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <span className="terminal-title">system_overview.log</span>
                </div>
                <div className="terminal-body">
                    <p className="line-code"><span className="token-cmd">$</span> initialize --platform-status</p>
                    <p className="line-success">✔ Central Core Connected Successfully</p>
                    <p className="line-text">Database Sync: ACTIVE | Total Latency: 14ms | Global Scope: Full Width Enabled</p>
                </div>
            </div>
        </div>
    );
};

export default Homepage