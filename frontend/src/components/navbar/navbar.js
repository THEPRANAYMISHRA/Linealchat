import React, { useContext } from 'react'
import { userlistContext } from '../../userlistContext';
import "./navbar.css";

export default function Navbar() {
    const imageurl = localStorage.getItem("profilePhoto");
    const username = localStorage.getItem("username");
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mynavbar">
            <div className="container gap-3">
                {/* 1 */}
                <a className="navbar-brand border-1" href="/"><img src="https://cdn-icons-png.flaticon.com/128/1029/1029183.png" alt="Logo" className='logoimage' /> LinealChat </a>
                {/* 2 */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* 3 */}
                <div className="collapse navbar-collapse border-1" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <img src={imageurl ? imageurl : "https://cdn-icons-png.flaticon.com/128/64/64572.png"} alt="profile" width={30} height={30} style={{ borderRadius: 50 }} />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">{username ? username : "Your Profile"}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


