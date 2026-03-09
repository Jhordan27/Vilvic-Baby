import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import toast from 'react-hot-toast';
import './Login.css';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegister) {
            if (password !== confirmPassword) {
                toast.error('Las contraseñas no coinciden', { icon: '❌' });
                return;
            }
            // Mock register
            const user = { name, email };
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('¡Registro exitoso! Ya puedes iniciar sesión.', { icon: '🎉' });
            setIsRegister(false);
        } else {
            // Mock login
            const savedUserString = localStorage.getItem('user');
            const savedUser = savedUserString ? JSON.parse(savedUserString) : null;

            if (email && password) {
                if (savedUser && savedUser.email === email) {
                    localStorage.setItem('currentUser', JSON.stringify(savedUser));
                } else {
                    localStorage.setItem('currentUser', JSON.stringify({ email, name: email.split('@')[0] }));
                }
                toast.success('Bienvenido a moda cajamarca', { icon: '👋' });
                navigate('/profile');
            }
        }
    };

    return (
        <div className="login-container fade-in">
            <div className="login-card card">
                <header className="login-header">
                    <h2 className="title" style={{ fontSize: '1.75rem' }}>{isRegister ? 'Crear Cuenta' : 'Bienvenido'}</h2>
                    <p className="text-muted">{isRegister ? 'Regístrate para empezar a comprar' : 'Ingresa a tu cuenta de Boutique Boutique'}</p>
                </header>

                <form onSubmit={handleSubmit} className="login-form">
                    {isRegister && (
                        <div className="input-field">
                            <label><User size={16} /> Nombre Completo</label>
                            <input
                                type="text"
                                placeholder="Tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="input-field">
                        <label><Mail size={16} /> Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label><Lock size={16} /> Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {isRegister && (
                        <div className="input-field">
                            <label><Lock size={16} /> Confirmar Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="btn-primary login-btn">
                        {isRegister ? 'Registrarse' : 'Iniciar Sesión'} <ArrowRight size={18} />
                    </button>
                </form>

                <footer className="login-footer">
                    <p>
                        {isRegister ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
                        <span className="link" onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? ' Inicia Sesión' : ' Regístrate'}
                        </span>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
