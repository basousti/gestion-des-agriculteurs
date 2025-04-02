import { useState } from "react";
import "./example.css";

const ResetPassword: React.FC = () => {

    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="page">
            <div className="containers">
                <div className="sign-in">
                    <form >
                        <h2>Reset Password</h2>
                        <br/>
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <input type="password" name="password2" placeholder="Confirm Password" value={ConfirmPassword} required />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <button type="submit">Submit</button> {/* after submitting w yet2ked eli lcode s7i7 yarja3 lel login */}
                    </form>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
