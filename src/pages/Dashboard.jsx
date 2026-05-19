import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Dashboard = () => {
    const [snippets, setSnippets] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const config = {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                };

                const [snippetsRes, categoriesRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/snippets`, config),
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, config)
                ]);

                if (snippetsRes.ok && categoriesRes.ok) {
                    const snippetsData = await snippetsRes.json();
                    const categoriesData = await categoriesRes.json();
                    setSnippets(snippetsData);
                    setCategories(categoriesData);
                }
            } catch (err) {
                console.error("Error loading dashboard data:", err);
            }
        };

        fetchDashboardData();
    }, []);

    const latestSnippets = snippets.slice(-3).reverse();

    return (
        <div className="container">
            <h1>Developer Dashboard</h1>
            <p className="subtitle">// Overview of your saved code infrastructure.</p>
            <hr />

            <div className="grid-2">
                <div className="card">
                    <h3>Total Snippets</h3>
                    <p className="card-stat">{snippets.length}</p>
                    <Link to="/snippets"><button className="btn-primary">View All Codes</button></Link>
                </div>

                <div className="card">
                    <h3>Total Categories</h3>
                    <p className="card-stat">{categories.length}</p>
                    <Link to="/categories"><button className="btn-primary">Manage Categories</button></Link>
                </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <h2>Quick Actions</h2>
                <div style={{ marginTop: '15px' }}>
                    <Link to="/snippets/add"><button className="btn-success">+ Add New Code</button></Link>
                </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <h2>Recently Added Snippets</h2>
                <div style={{ marginTop: '15px' }}>
                    {latestSnippets.length === 0 ? (
                        <p style={{ fontFamily: 'Courier New', color: '#94a3b8' }}>No snippets created yet.</p>
                    ) : (
                        <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                            {latestSnippets.map(snippet => (
                                <li key={snippet._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #2a3b5c' }}>
                                    <div>
                                        <strong style={{ fontSize: '1.05rem' }}>{snippet.title}</strong>
                                        <span style={{ fontFamily: 'Courier New', fontSize: '0.8rem', marginLeft: '12px', padding: '4px 8px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', color: '#38bdf8', borderRadius: '4px' }}>
                                            {snippet.category?.name || 'Uncategorized'}
                                        </span>
                                    </div>
                                    <Link to={`/snippets/${snippet._id}`}><button className="btn-primary">View Details</button></Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;