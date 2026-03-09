import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*, categories(name)');

            if (data) {
                setProducts(data.map(p => ({
                    ...p,
                    category_name: p.categories?.name || 'Uncategorized'
                })));
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    return { products, loading };
};
