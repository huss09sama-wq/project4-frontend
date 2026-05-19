import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';

const SnippetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/snippets/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setSnippet(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchSnippet();
    }, [id]);

    if (!snippet) return <p>Loading...</p>;

    return (
        <div>
            <h1>{snippet.title}</h1>
            <p><strong>Category:</strong> {snippet.category?.name}</p>
            
            <h3>Code:</h3>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
                {snippet.code}
            </pre>

            <h3>Logic Flow:</h3>
            <p>{snippet.logic_flow}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => navigate('/snippets')}>Back to List</button>
                <Link to={`/snippets/${id}/edit`}>
                    <button style={{ backgroundColor: '#ffc107' }}>Edit Snippet</button>
                </Link>
            </div>
        </div>
    );
};

export default SnippetDetails;