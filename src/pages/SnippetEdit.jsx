import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const SnippetEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        logic_flow: '',
        category: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                };

                const [catRes, snippetRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, config),
                    fetch(`${import.meta.env.VITE_BACKEND_URL}/snippets/${id}`, config)
                ]);

                if (catRes.ok && snippetRes.ok) {
                    const categoriesData = await catRes.json();
                    const snippetData = await snippetRes.json();
                    
                    setCategories(categoriesData);
                    setFormData({
                        title: snippetData.title,
                        code: snippetData.code,
                        logic_flow: snippetData.logic_flow,
                        category: snippetData.category?._id || snippetData.category
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/snippets/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate(`/snippets/${id}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Edit Snippet</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    required 
                />
                <textarea 
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })} 
                    required 
                />
                <textarea 
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
                <button type="submit">Update Snippet</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
};

export default SnippetEdit;