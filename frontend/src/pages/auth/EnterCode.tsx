import { useState } from "react";
import "./example.css";
 
const ResetPassword = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/Verif/Code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ verificationCode }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="page">
            <div className="containers">
                <div className="sign-in">
                    <form onSubmit={handleSubmit}>
                        <h2>Enter Confirmation Code</h2>
                        <br/>
                        <input type="text" placeholder="Enter verification code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                        <button type="submit">Submit</button>
                    </form>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
