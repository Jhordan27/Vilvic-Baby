import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Layers, Palette, Rocket } from 'lucide-react';
import './CategorySection.css';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);

    const dummyCategories = [
        { id: 1, name: 'Winter Collection', description: 'Warm and cozy items for the cold season.', slug: 'winter', icon: <Palette size={24} /> },
        { id: 2, name: 'Streetwear', description: 'Modern clothing style for city life.', slug: 'streetwear', icon: <Rocket size={24} /> },
        { id: 3, name: 'Minimalist', description: 'Simple, clean lines and classic cuts.', slug: 'minimalist', icon: <Layers size={24} /> }
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('*');
            if (data && data.length > 0) setCategories(data);
            else setCategories(dummyCategories);
        };
        fetchCategories();
    }, []);

    return (
        <section className="category-section">
            <h2 className="title">Browse <span className="gradient-text">Categories</span></h2>
            <div className="category-grid">
                {categories.map((cat, index) => (
                    <div key={cat.id || index} className="category-card glass fade-in">
                        <div className="cat-icon">{cat.icon || <Layers size={24} />}</div>
                        <h3 className="cat-name">{cat.name}</h3>
                        <p className="cat-description text-muted">{cat.description}</p>
                        <button className="btn-outline glass" style={{ marginTop: '1rem', width: '100%' }}>View All</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
