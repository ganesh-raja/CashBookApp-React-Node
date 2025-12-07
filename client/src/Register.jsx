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
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-lg-4 p-4 border border-2 rounded">
                    <form className='registerFrom' onSubmit={RegisterSubmit}>
                        <div className='text-center'>
                            <h4>Create Account</h4>
                            {regSuccess && <span className='text-success'>{regSuccess}</span>}
                            {regError && <span className="text-danger">{regError}</span>}
                        </div>
                        <hr className='w-100' />
                        <div className='mt-3'>
                            <label htmlFor="rname" className='form-label'>Name</label>
                            <input type="text" id='rname' name='rname' className='form-control' required autoFocus
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="remail" className='form-label'>Email</label>
                            <input type="text" id='remail' name='remail' className='form-control' required
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                            />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="lpass" className='form-label'>Password</label>
                            <input type="password" id='rpass' name='rpass' className='form-control' required
                                value={regPass}
                                onChange={(e) => setRegPass(e.target.value)}
                            />
                        </div>
                        <div className='mt-3 text-center'>
                            <button type='submit' className='btn btn-outline-primary'>Register</button>
                        </div>
                        <div className='mt-3 text-center'>
                            <Link to="/login">Already have an account? Login here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
