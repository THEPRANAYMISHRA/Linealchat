import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css';

// let baseurl = 'https://marschat.onrender.com'
let baseurl = 'http://localhost:3000';

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        fetch(`${baseurl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => {
            return res.json();
        }).then((data) => {
            localStorage.setItem("marschattoken", data.token);
            localStorage.setItem("profilePhoto", data.profilePhoto);
            localStorage.setItem("username", data.name);
            alert("Login Successful")
            setTimeout(() => {
                navigate("/chats")
            }, 1000);
        }).catch((err) => {
            console.log(err)
            alert("Login failed")
        }).finally(() => {
            setIsLoading(false);
        })
    }
    return (
        <main>
            <form onSubmit={handleLogin}>
                <img src="https://cdn-icons-png.flaticon.com/128/1029/1029183.png" alt="" width={50} />
                <h2>Login Form</h2>
                <div className="alert alert-primary" role="alert"></div>
                <input
                    type="email"
                    id="email"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p>
                    Don't have an account!
                    <span><Link to='/signup'>Sign up now</Link></span>
                </p>
                <button type="submit" className="btn btn-primary">
                    {isLoading ? <svg viewBox="25 25 50 50" id="loader">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg> : <div id="loginBtnText">Login</div>}
                </button>
            </form>
        </main>
    )
}
