import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content card" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
                    <X size={20} />
                </button>
                <div className="product-modal-grid">
                    <div className="modal-img-container">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="modal-img" />
                        ) : (
                            <div className="product-placeholder">{product.name.charAt(0)}</div>
                        )}
                    </div>
                    <div className="modal-details">
                        <span className="modal-category">{product.category_name}</span>
                        <h2 className="title modal-title">{product.name}</h2>
                        <span className="modal-price">${Number(product.price).toFixed(2)}</span>
                        <p className="modal-description">{product.description || 'Sin descripción disponible para este producto.'}</p>

                        <div style={{ marginTop: 'auto' }}>
                            <button
                                className="btn-primary"
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem' }}
                                onClick={() => {
                                    onAddToCart(product);
                                    onClose();
                                }}
                            >
                                <ShoppingCart size={20} /> Añadir al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
