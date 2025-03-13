import React, { useState } from 'react';
import "./exemple.css";
import { useNavigate } from 'react-router-dom';


const Signup1:React.FC = () => {

  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("/login1");
  };

    const [formatData, setFormData]=useState({
        name:'',
        email: '',
        matriculate:'',
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
            name:'',
            email: '',
            matriculate:'',
            password:''
        })
    }

    }
  return (
        <div className="page">
            <div className="containers">
              <div className="sign-in">
                <form action="#" onSubmit={handleSubmit}>
                  <h1>Sign Up</h1>
                  <input type="text" name="name" placeholder="Name" value={formatData.name} onChange={handleInputChange} required />
                  <input type="email" name="email" placeholder="Email" value={formatData.email} onChange={handleInputChange} required />
                  <input type="text" name="matriculate" placeholder="Matriculate" value={formatData.matriculate} onChange={handleInputChange} required />
                  <input type="password" name="password" placeholder="Password" value={formatData.password} onChange={handleInputChange} required />
                  <input type="password" name="password2" placeholder="Confirm Password" required />
                  {/* ajouter une fonction qui permet de confirmer si le confirm pw et compaitble au pw */}
                  <button type="submit">Sign Up</button>
                  <div>
                    <p>Already have an account? <span style={{ cursor: 'pointer', color: '#f2ba38' }} onClick={onLoginClick}>Sign In</span></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
  );
};

export default Signup1;
