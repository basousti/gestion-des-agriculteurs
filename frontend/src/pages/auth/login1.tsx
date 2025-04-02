import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./example.css";


const Login1: React.FC = () => {

  const navigate = useNavigate();
  const onRegisterClick = () => {
    navigate("/Signup1");
  };

  const ForgetPassword = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Forgot Password clicked!");
    navigate("/forgetPW"); // Navigating to Forget Password page
};

  
  const [formatData, setFormData]=useState({ 
    name:'',
    password:''   
    })

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
      setFormData({
        ...formatData, 
        [name]: value
      })
  }
    
  const handleSubmit=async(e: React.FormEvent<HTMLFormElement>) => {
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
            name:'',
            password:''
        })
    }

  }
    
  return (
    <div className="page">
      <div className="containers">
        <div className="sign-in">
          <form action="#" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input type="text" name="name" placeholder="Username" autoComplete="name" value={formatData.name} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" autoComplete="password" value={formatData.password} onChange={handleInputChange} required />
            <a href="#" onClick={ForgetPassword}>Forgot password?</a>
            <button type="submit">Sign In</button>
            <div>
              <p>Don't have an account?<span style={{ cursor: 'pointer', color: '#f2ba38', textDecorationLine: 'underline' }} onClick={onRegisterClick}>Sign Up</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login1;