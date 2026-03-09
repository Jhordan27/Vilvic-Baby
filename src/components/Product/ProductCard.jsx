import React, { useState } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductModal from './ProductModal';
import toast from 'react-hot-toast';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [imgError, setImgError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = (p) => {
        const productToAdd = p || product;
        addToCart(productToAdd);
        toast.success(`${productToAdd.name} añadido al carrito`);
    };

    const handleQuickView = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="product-card fade-in">
                <div className="product-image-container">
                    {product.image_url && !imgError ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="product-image fade-in"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="product-placeholder">
                            {product.name ? product.name.charAt(0) : '?'}
                        </div>
                    )}
                    <div className="product-actions">
                        <button className="icon-btn-rounded" onClick={() => handleAddToCart()} title="Añadir al carrito">
                            <ShoppingCart size={16} />
                        </button>
                        <button className="icon-btn-rounded" onClick={handleQuickView} title="Vista rápida">
                            <Eye size={16} />
                        </button>
                    </div>
                </div>
                <div className="product-info">
                    <span className="product-category">{product.category_name}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-footer">
                        <span className="product-price">${Number(product.price).toFixed(2)}</span>
                        <button className="add-btn" onClick={() => handleAddToCart()}>Añadir</button>
                    </div>
                </div>
            </div>

            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToCart={handleAddToCart}
            />
        </>
    );
};

export default ProductCard;
