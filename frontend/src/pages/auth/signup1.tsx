import React, { useState } from 'react';
import "./example.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup1: React.FC = () => {

  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("/login1");
  };

  const [formatData, setFormData] = useState({
    name: '',
    email: '',
    matriculate: '',
    password: '',
    password2: ''
  })

  const [error, setError] = useState("");
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formatData,
      [name]: value
    })

    if (name === "password2") {
      setError(value !== formatData.password ? "The confirmed passwords don't match" : "");}
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatData)
      });
 
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message); // message from backend
      }
      toast.success("Sign up successful!");
      navigate("/login1")

    } catch (error: any) {
      toast.error("Sign up error: " + error.message); // Custom message
    } 
    finally {
      setFormData({
        name: '',
        email: '',
        matriculate: '',
        password: '',
        password2: ''
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
            <input type="Number" name="matriculate" placeholder="Matriculate" value={formatData.matriculate} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={formatData.password} onChange={handleInputChange} required />
            <input type="password" name="password2" placeholder="Confirm Password" value={formatData.password2} onChange={handleInputChange} required />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* ajouter une fonction qui permet ne pas **submitter que le confirmPW est compaitble au pw */}
            <button type="submit">Create account</button>
            <div>
              <p>Already have an account? <span style={{ cursor: 'pointer', color: '#f2ba38' , textDecorationLine: 'underline'}} onClick={onLoginClick}>Sign In</span></p>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup1;


