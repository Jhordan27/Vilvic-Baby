import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import PayPalButton from '../../components/Payment/PayPalButton';
import { ShoppingBag, ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const { cart, removeFromCart, updateQuantity, total } = useCart();
    const [clientInfo, setClientInfo] = useState({ name: '', email: '', address: '', phone: '' });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            setClientInfo(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        setClientInfo({ ...clientInfo, [e.target.name]: e.target.value });
    };

    if (cart.length === 0) {
        return (
            <div className="empty-cart-container fade-in">
                <ShoppingBag size={80} className="text-muted" />
                <h2 className="title">Tu carrito está vacío</h2>
                <p className="text-muted">Parece que aún no has añadido ningún producto.</p>
                <Link to="/" className="btn-primary">Ir a la Tienda</Link>
            </div>
        );
    }

    return (
        <div className="checkout-layout fade-in">
            <div className="checkout-main">
                <Link to="/" className="back-link"><ChevronLeft size={18} /> Seguir comprando</Link>
                <h1 className="title">Finalizar Compra</h1>

                <div className="cart-list">
                    <h3>Tu Pedido</h3>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="item-img-container">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} className="item-img" />
                                ) : (
                                    <div className="item-img-placeholder">{item.name.charAt(0)}</div>
                                )}
                            </div>
                            <div className="item-details">
                                <span className="item-name">{item.name}</span>
                                <div className="quantity-controls">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="item-qty">{item.quantity}</span>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                            <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Eliminar">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="client-form">
                    <h3>Datos de Envío (Pedido)</h3>
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={clientInfo.name}
                                onChange={handleInputChange}
                                placeholder="Nombre completo"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={clientInfo.email}
                                onChange={handleInputChange}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Dirección de Envío</label>
                            <input
                                type="text"
                                name="address"
                                value={clientInfo.address}
                                onChange={handleInputChange}
                                placeholder="Calle, ciudad, distrito"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Teléfono de Contacto</label>
                            <input
                                type="tel"
                                name="phone"
                                value={clientInfo.phone}
                                onChange={handleInputChange}
                                placeholder="999-999-999"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="checkout-sidebar">
                <h3>Resumen de Pedido</h3>
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Envío</span>
                    <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>GRATIS</span>
                </div>
                <div className="divider" />
                <div className="summary-row total-row">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                {clientInfo.name && clientInfo.email && clientInfo.address && clientInfo.phone ? (
                    <PayPalButton amount={total} clientInfo={clientInfo} />
                ) : (
                    <p className="warning-text">Completa todos los datos de envío para pagar</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
