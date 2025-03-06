import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface Props {
    onLoginClick: () => void;
}

const Signup: React.FC<Props> = ({ onLoginClick }) => {
    const navigate = useNavigate();
    const [formatData, setFormData]=useState({
        userName:'',
        email: '',
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
        const response = await fetch("http://localhost:5000/user/register",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formatData)
        })
        const result = await response.json();
        console.log(result);
        navigate("/DashboardE")
        
    } catch (error:any) {
        console.log(error.message);
    }finally{
        setFormData({
            userName:'',
            email: '',
            password:''
        })
    }

    }
        return (
            <>
                <div className="form-box register">
                    <h2 className="title animation" style={{ "--i": 17, "--j": 0 } as React.CSSProperties}>Sign Up</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="input-box animation" style={{ "--i": 18, "--j": 1 } as React.CSSProperties}>
                            <input type="text" name="userName" value={formatData.userName} onChange={handleInputChange} required />
                            <label>Username</label>
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className="input-box animation" style={{ "--i": 19, "--j": 2 } as React.CSSProperties}>
                            <input type="email" name="email" value={formatData.email} onChange={handleInputChange} required />
                            <label>Email</label>
                            <i className='bx bxs-envelope'></i>
                        </div>
                        <div className="input-box animation" style={{ "--i": 20, "--j": 3 } as React.CSSProperties}>
                            <input type="password" name="password" value={formatData.password} onChange={handleInputChange} required />
                            <label>Password</label>
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <button type="submit" className="btn animation" style={{ "--i": 21, "--j": 4 } as React.CSSProperties}>Sign Up</button>
                        <div className="linkTxt animation" style={{ "--i": 22, "--j": 5 } as React.CSSProperties}>
                            <p>Already have an account? <span className="login-link" style={{ cursor: 'pointer', color: '#a3f5c2' }} onClick={onLoginClick}>Login</span></p>
                        </div>
                    </form>
                </div>

                <div className="info-text register" style={{ color: "white" }}>
                    <h2 className="animation" style={{ "--i": 17, "--j": 0 } as React.CSSProperties}>Welcome Back!</h2>
                    <p className="animation" style={{ "--i": 18, "--j": 1 } as React.CSSProperties}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, rem?</p>
                </div>
            </>
        );
};

export default Signup;
