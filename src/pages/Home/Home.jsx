import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import ProductCard from '../../components/Product/ProductCard';
import { Filter, ShoppingBag, Search as SearchIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const dummyProducts = [
        { id: 1, name: 'Vestido de Seda Midnight', price: 120.00, category_id: 1, category_name: 'Elegante', description: 'Vestido de seda para ocasiones especiales.', image_url: 'https://images.unsplash.com/photo-1539008835270-1282ec69372e?q=80&w=800&auto=format&fit=crop' },
        { id: 2, name: 'Hoodie Vortex Streetwear', price: 85.00, category_id: 3, category_name: 'Urbano', description: 'Abrigo cómodo con diseño minimalista.', image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop' },
        { id: 3, name: 'Pantalón Lino Classic', price: 65.00, category_id: 2, category_name: 'Verano', description: 'Ideal para días calurosos.', image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop' },
        { id: 4, name: 'Chaqueta Cuero Obsidian', price: 210.00, category_id: 1, category_name: 'Elegante', description: 'Cuero genuino 100% premium.', image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop' },
        { id: 5, name: 'Camiseta Essential White', price: 35.00, category_id: 3, category_name: 'Urbano', description: 'Básica y versátil para el día a día.', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
        { id: 6, name: 'Blazer Soft Grey', price: 145.00, category_id: 1, category_name: 'Elegante', description: 'Elegancia y confort en una sola prenda.', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' },
        { id: 'dummy_7', name: 'Cadena Eslabones Gold', price: 55.00, category_id: 4, category_name: 'Accesorios', description: 'Cadena con baño de oro 18k premium.', image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories
                const { data: catData } = await supabase.from('categories').select('*');
                setCategories(catData || []);

                // Fetch products
                const { data: prodData } = await supabase
                    .from('products')
                    .select('*, categories(name)');

                if (prodData && prodData.length > 0) {
                    const formattedData = prodData.map(p => ({
                        ...p,
                        category_id: p.category_id,
                        category_name: p.categories?.name || 'Complementos'
                    }));
                    setProducts(formattedData);
                } else {
                    setProducts(dummyProducts);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setProducts(dummyProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategory === 'all' || p.category_id?.toString() === selectedCategory.toString();
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="home-container fade-in">
            <header className="shop-intro">
                <h1 className="title">Nuestra <span className="gradient-text">Colección</span></h1>
                <p className="text-muted">Encuentra las mejores prendas con estilo y calidad premium.</p>

                <div className="search-bar-container">
                    <div className="search-input-wrapper card">
                        <SearchIcon size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
            </header>

            <div className="shop-layout">
                <aside className="filters-sidebar">
                    <div className="filter-header">
                        <Filter size={18} />
                        <h3>Categorías</h3>
                    </div>
                    <ul className="category-list">
                        <li
                            className={selectedCategory === 'all' ? 'active' : ''}
                            onClick={() => setSelectedCategory('all')}
                        >
                            Ver Todo
                        </li>
                        {categories.map(cat => (
                            <li
                                key={cat.id}
                                className={selectedCategory.toString() === cat.id.toString() ? 'active' : ''}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="products-section">
                    {loading ? (
                        <div className="loading-state">Cargando productos...</div>
                    ) : (
                        <div className="products-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            ) : (
                                <div className="no-products">
                                    <SearchIcon size={48} />
                                    <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
