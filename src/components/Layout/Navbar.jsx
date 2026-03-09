import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import './Navbar.css';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const { cart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <nav className="navbar-container">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    Vilvic <span className="logo-accent">Baby</span>
                </Link>
                <div className="nav-links">
                    <Link to="/">Colección</Link>
                    {user ? (
                        <Link to="/profile">Mi Perfil</Link>
                    ) : (
                        <Link to="/login">Cuenta</Link>
                    )}
                </div>
                <div className="nav-icons">
                    <button
                        className="icon-btn"
                        title="Buscar"
                        onClick={() => { document.querySelector('.search-input')?.focus(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                        <Search size={20} />
                    </button>
                    <Link to={user ? "/profile" : "/login"} className="icon-btn" title="Mi Cuenta">
                        <User size={20} />
                    </Link>
                    <Link to="/checkout" className="icon-btn cart-btn" title="Carrito">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
