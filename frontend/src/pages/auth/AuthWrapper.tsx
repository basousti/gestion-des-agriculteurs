import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './login';
import Signup from './signUp';
import './style.css';
import 'boxicons/css/boxicons.min.css';


const AuthWrapper: React.FC = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
    const navigate = useNavigate();

    const showRegister = () => {
        setActiveForm('register');
        navigate('/signup');
    };

    const showLogin = () => {
        setActiveForm('login');
        navigate('/login');
    };

    return (
        <div className='login-container'>
            <div className={`wrapper ${activeForm === 'register' ? 'active' : ''}`}>
                <span className="rotate-bg"></span>
                <span className="rotate-bg2"></span>

                <Routes>
                    <Route path="/login" element={<Login onRegisterClick={showRegister} />} />
                    <Route path="/signup" element={<Signup onLoginClick={showLogin} />} />
                </Routes>
            </div>
        </div>
    );
};

export default AuthWrapper;
