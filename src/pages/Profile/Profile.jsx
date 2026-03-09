import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Settings, LogOut, Package, ExternalLink, Calendar, Hash, DollarSign } from 'lucide-react';
import { supabase } from '../../services/supabase';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('currentUser');
    const user = userString ? JSON.parse(userString) : null;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('account'); // 'account' or 'orders'

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('sales')
                .select('*, sale_items(*, products(name))')
                .eq('client_email', user.email)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="profile-container fade-in">
                <div className="profile-card card" style={{ textAlign: 'center' }}>
                    <h2 className="title">No has iniciado sesión</h2>
                    <p className="text-muted">Por favor, inicia sesión para ver tu perfil.</p>
                    <button className="btn-primary" onClick={() => navigate('/login')} style={{ marginTop: '2rem' }}>
                        Ir al Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container fade-in">
            <div className="profile-grid">
                <aside className="profile-sidebar card">
                    <div className="profile-header">
                        <div className="user-avatar">
                            <User size={48} />
                        </div>
                        <h3>{user.name}</h3>
                        <p className="text-muted">{user.email}</p>
                    </div>
                    <nav className="profile-nav">
                        <button
                            className={`nav-item ${view === 'account' ? 'active' : ''}`}
                            onClick={() => setView('account')}
                        >
                            <User size={18} />
                            <span>Mi Perfil</span>
                        </button>
                        <button
                            className={`nav-item ${view === 'orders' ? 'active' : ''}`}
                            onClick={() => setView('orders')}
                        >
                            <Package size={18} />
                            <span>Mis Pedidos</span>
                        </button>
                        <button
                            className={`nav-item ${view === 'settings' ? 'active' : ''}`}
                            onClick={() => setView('settings')}
                        >
                            <Settings size={18} />
                            <span>Configuración</span>
                        </button>
                        <div className="nav-divider"></div>
                        <button className="nav-item logout" onClick={handleLogout}>
                            <LogOut size={18} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </nav>
                </aside>

                <main className="profile-content">
                    {view === 'account' ? (
                        <>
                            <div className="profile-card card">
                                <h2 className="title" style={{ fontSize: '1.5rem' }}>Detalles de la Cuenta</h2>
                                <div className="details-list">
                                    <div className="detail-item">
                                        <label>Nombre Completo</label>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Correo Electrónico</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="detail-item">
                                        <label>Tipo de Cuenta</label>
                                        <p>Cliente</p>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-card card" style={{ marginTop: '2rem' }}>
                                <h2 className="title" style={{ fontSize: '1.5rem' }}>Resumen de Actividad</h2>
                                <div className="activity-stats">
                                    <div className="stat-card">
                                        <Package size={24} />
                                        <span>{orders.length} Pedidos Realizados</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : view === 'orders' ? (
                        <div className="profile-card card">
                            <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Historial de Pedidos</h2>
                            {loading ? (
                                <p>Cargando pedidos...</p>
                            ) : orders.length > 0 ? (
                                <div className="orders-list">
                                    {orders.map((order) => (
                                        <div key={order.id} className="order-item card">
                                            <div className="order-header">
                                                <div className="order-info-group">
                                                    <span className="order-date"><Calendar size={14} /> {new Date(order.created_at).toLocaleDateString()}</span>
                                                    <span className="order-id"><Hash size={14} /> No. {order.id}</span>
                                                </div>
                                                <span className={`order-status ${order.status}`}>{order.status === 'completed' ? 'Pagado' : order.status}</span>
                                            </div>
                                            <div className="order-body">
                                                <div className="order-products">
                                                    {order.sale_items?.map((item, idx) => (
                                                        <span key={idx} className="order-product-tag">
                                                            {item.products?.name} (x{item.quantity})
                                                        </span>
                                                    ))}
                                                </div>
                                                {(order.client_address || order.client_phone) && (
                                                    <div className="order-delivery-info">
                                                        {order.client_address && <span>📍 {order.client_address}</span>}
                                                        {order.client_phone && <span>📞 {order.client_phone}</span>}
                                                    </div>
                                                )}
                                                <div className="order-total-row">
                                                    <span>Total:</span>
                                                    <span className="order-total-amount"><DollarSign size={16} />{Number(order.total).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-activity">
                                    <Package size={40} />
                                    <p>Aún no has realizado ningún pedido.</p>
                                    <button className="btn-outline" onClick={() => navigate('/')}>Ir a la tienda</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="profile-card card">
                            <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Configuración de Perfil</h2>
                            <form className="settings-form" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const updatedUser = {
                                    ...user,
                                    name: formData.get('name'),
                                    email: formData.get('email')
                                };
                                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                                window.location.reload();
                                toast.success('Perfil actualizado correctamente');
                            }}>
                                <div className="input-group">
                                    <label>Nombre Completo</label>
                                    <input type="text" name="name" defaultValue={user.name} required />
                                </div>
                                <div className="input-group">
                                    <label>Correo Electrónico</label>
                                    <input type="email" name="email" defaultValue={user.email} required />
                                </div>
                                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                                    Guardar Cambios
                                </button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Profile;
