import React, { useState, useEffect } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/categories`;
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/categories`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setFormData({ name: '', description: '' });
                fetchCategories();
            }
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.ok) {
                setCategories(categories.filter(s => s._id !== id));
            }
        } catch (err) {
            console.error("Delete Error:", err);
        }
    };

    return (
        <div>
            <h1>Categories</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    placeholder="Category Name" 
                    required 
                />
                <input 
                    type="text" 
                    value={formData.description} 
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                    placeholder="Description" 
                />
                <button type="submit">Add Category</button>
            </form>
            <hr />
            <ul>
                {categories.map(cat => (
                    <li key={cat._id}>
                        {cat.name} - {cat.description}
                        <button onClick={() => handleDelete(cat._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;