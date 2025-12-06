import React, { useState } from 'react'
import { Link } from 'react-router';

const Register = ({ api, navigate }) => {
    const [regName, setRegName] = useState("")
    const [regEmail, setRegEmail] = useState("")
    const [regPass, setRegPass] = useState("")
    const [regError, setRegError] = useState("")
    const [regSuccess, setRegSuccess] = useState("")

    function isValidEmail(email) {        
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const RegisterSubmit = async (e) => {
        e.preventDefault();

        const email = document.getElementById("remail")

        if (!isValidEmail(regEmail)) {
            alert("Please enter a valid email address.");
            email.focus();            
            return;
        }

        try {
            const res = await fetch(`${api}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: regName, email: regEmail, password: regPass })
            });

            const data = await res.json()

            if (data.status === 1 || data.message?.toLowerCase().includes("success")) {
                setRegSuccess(data.message || "Registration successful! Redirecting to login...");
                setRegError("");
                setTimeout(() => {
                    navigate("/login")
                }, 1500);
            }
            else {
                setRegError(data.message)
            }

        } catch (err) {
            if (err.response?.data?.message) {
                setRegError(err.response.data.message || "Registration failed");
            } else {
                setRegError("Error connecting to server");
            }
        }

    }

    return (
        <form className='registerFrom' onSubmit={RegisterSubmit}>
            <h4>Create Account</h4>
            {regSuccess && <span id="sucMsg">{regSuccess}</span>}
            {regError && <span id="errMsg1">{regError}</span>}
            <label htmlFor="rname">Name</label>
            <input type="text" id='rname' name='rname' required autoFocus
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
            />
            <label htmlFor="remail">Email</label>
            <input type="text" id='remail' name='remail' required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
            />
            <label htmlFor="lpass">Password</label>
            <input type="password" id='rpass' name='rpass' required
                value={regPass}
                onChange={(e) => setRegPass(e.target.value)}
            />
            <button type='submit'>Register</button>
            <Link to="/login">Already have an account? Login here</Link>
        </form>
    )
}

export default Register
