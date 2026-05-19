import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

const Allsnippets = () => {
    const [snippets, setSnippets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSnippets();
    }, []);

    const fetchSnippets = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/snippets`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                setSnippets(data);
                
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this snippet?")) return;
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/snippets/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.ok) {
                setSnippets(snippets.filter(s => s._id !== id));
            }
        } catch (err) {
            console.error("Delete Error:", err);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>My Code Snippets</h1>
                <Link to="/snippets/add">
                    <button style={{ backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
                        + Add New Snippet
                    </button>
                </Link>
            </div>

            <hr />

            {snippets.length === 0 ? (
                <p>No snippets found. Start by adding one!</p>
            ) : (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {snippets.map((snippet) => (
                        <div 
                            key={snippet._id} 
                            style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}
                        >
                            <h3>{snippet.title}</h3>
                            <p><strong>Category:</strong> {snippet.category?.name || 'Uncategorized'}</p>
                            
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => navigate(`/snippets/${snippet._id}`)}>
                                    View Details
                                </button>
                                
                                <button 
                                    onClick={() => navigate(`/snippets/${snippet._id}/edit`)}
                                    style={{ backgroundColor: '#ffc107' }}
                                >
                                    Edit
                                </button>
                                
                                <button 
                                    onClick={() => handleDelete(snippet._id)}
                                    style={{ backgroundColor: '#dc3545', color: 'white' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Allsnippets;