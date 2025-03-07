import { useNavigate } from 'react-router-dom';
import './style.css';

import React, { useState } from 'react';

interface Props {
    onRegisterClick: () => void;
}

const Login: React.FC<Props> = ({ onRegisterClick }) => {

    const navigate = useNavigate();
    const [formatData, setFormData]=useState({
        userName:'',
        password:''   
    })

    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setFormData({
            ...formatData, 
            [name]: value
        })
    }
    const handleSubmit=async(e:any) => {
        e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/auth/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formatData)
        })
        const result = await response.json();
        console.log("login response token ",result);

        if (response.ok) { // ✅ Only save if login is successful
            localStorage.setItem("token", result.token); // ✅ Save token
            navigate("/DashboardA"); // ✅ Navigate after saving token
        } else {
            console.log("login failed ", result.message);
            
        }
        
    } catch (error:any) {
        console.log(error.message);
    }finally{
        setFormData({
            userName:'',
            password:''
        })
    }

    }
    
    return (
        <>
            <div className="form-box login">
                <h2 className="title animation" data-i="0" data-j="21">Login</h2>
                <form action="#" onSubmit={handleSubmit}>
                    <div className="input-box animation" style={{ "--i": 1, "--j": 22 } as React.CSSProperties} >
                        <input type="text" name="userName" value={formatData.userName} onChange={handleInputChange} required  />
                        <label>Username</label>
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box animation" style={{ "--i": 2, "--j": 23 } as React.CSSProperties}>
                        <input type="password" name="password" value={formatData.password} onChange={handleInputChange} required  />
                        <label>Password</label>
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn animation" style={{ "--i": 3, "--j": 24 } as React.CSSProperties}>Login</button>
                    <div className="linkTxt animation" style={{ "--i": 5, "--j": 25 } as React.CSSProperties}>
                        <p>Don't have an account? <span className="register-link" style={{ cursor: 'pointer', color: '#a3f5c2' }} onClick={onRegisterClick}>Sign Up</span></p>
                    </div>
                </form>
            </div>

            <div className="info-text login" style={{ color: "white" }}>
                <h2 className="animation" style={{ "--i": 0, "--j": 20 } as React.CSSProperties}>Welcome Back!</h2>
                <p className="animation" style={{ "--i": 1, "--j": 21 } as React.CSSProperties}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
            </div>
        </>
    );
};

export default Login;
