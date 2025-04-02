import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./example.css";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>(""); 
  const [message, setMessage] = useState<string>(""); // Store success/error messages

  const onLoginClick = () => {
    navigate("/login1");
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/EnterCode");
    }else {
        setMessage("Error: " + result.message);
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setMessage("Error: Unable to send reset email. Please try again.");
      }
    }
  };

  return (
    // el design lezmou yetbadel myo93edch houa houa fel les 3 fichier el jeyin
    <div className="page">
      <div className="containers">
        <div className="sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <p>Enter the email address you use.<br/> We'll send you a code to reset your password.</p>
            <br/>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              autoComplete="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit">Reset password</button>
            {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
            <div>
              <p>Back to <span style={{ cursor: 'pointer', color: '#f2ba38',textDecoration: 'underline' }} onClick={onLoginClick}>Login</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


// import React , {useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./exemple.css";


// const ForgotPassword: React.FC = () => {

//   const navigate = useNavigate();
//   const onLoginClick = () => {
//     navigate("/login1");
//   };


//   const [email, setEmail]=useState("")
    
//   const handleSubmit=async(e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//     try {
//         const response = await fetch("#",{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email })
//         })
//         const result = await response.json();
//         console.log("email code was sent ",result);

        
//     } catch (error:any) {
//         console.log(error.message);
//     }

//   }
  
    
//   return (
//     <div className="page">
//       <div className="containers">
//         <div className="sign-in">
//           <form action="#" onSubmit={handleSubmit}>
//             <h1>Forgot Password</h1>
//             <p>Enter the email address you use .<br/> We'll send you a code to reset your password.</p>
//             <br/>
//             <input type="email" name="email" placeholder="Enter your email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
//             <button type="submit">Reset password</button>
//             <br/>
//             <div>
//               <p>Back to <span style={{ cursor: 'pointer', color: '#f2ba38' , textDecorationLine: 'underline'}} onClick={onLoginClick}>Login</span></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ForgotPassword;