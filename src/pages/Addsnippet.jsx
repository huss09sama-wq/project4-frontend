import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const AddSnippet = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        logic_flow: '',
        category: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch('http://localhost:3000/snippets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });
        
        if (res.ok) {
            navigate('/snippets');
        } else {
            const errorData = await res.json();
            console.error('Server error:', errorData);
        }
    } catch (err) {
        console.error('Network error:', err);
    }
};

    return (
        <div>
            <h1>Add New Snippet</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    required 
                />
                <textarea 
                    placeholder="Code" 
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })} 
                    required 
                />
                <textarea 
                    placeholder="Logic Flow" 
                    value={formData.logic_flow}
                    onChange={(e) => setFormData({ ...formData, logic_flow: e.target.value })} 
                    required 
                />
                <select 
                    value={formData.category} 
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <button type="submit">Save Snippet</button>
            </form>
        </div>
    );
};

export default AddSnippet;