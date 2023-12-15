import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./signup.css"

// let baseurl = 'https://marschat.onrender.com'
let baseurl = 'http://localhost:3000';

export default function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    let [preview, setPreview] = useState('https://cdn-icons-png.flaticon.com/128/64/64572.png')
    let [uploadImage, setUploadImage] = useState()
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("avatar", uploadImage);
        formData.append("password", password);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const result = await axios.post(`${baseurl}/user/register`, formData, config);

            if (result.status === 201) {
                alert("Signup successful");
                setIsLoading(false);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (error) {
            if (error.response.status === 409) {
                alert("Email already exists");
            } else {
                alert("Signup failed. Please try again later.");
            }
        } finally {
            setIsLoading(false);
        }



    }

    const handlePreviewImage = (event) => {
        const input = event.target;
        setUploadImage(event.target.files[0])
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    return (
        <main>
            <form onSubmit={handleSignup}>
                <img src="https://cdn-icons-png.flaticon.com/128/1029/1029183.png" alt="" width={50} />
                <h2>Sign up Form</h2>
                <div className='border w-100 d-flex justify-content-center h-100'>
                    <label htmlFor="profileImage"><img src={preview} className='previewImageDisplay' alt="" /></label>
                    <input type="file" id='profileImage' accept="image/*" onChange={handlePreviewImage} className='d-none'></input>
                </div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p>
                    Already have an account!
                    <span><Link to='/login'>Login</Link></span>
                </p>
                <button type="submit" className="btn btn-primary">
                    {isLoading ? <svg viewBox="25 25 50 50" id="loader">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg> : <div id="signupBtnText">Sign Up</div>}
                </button>
            </form>
        </main >
    )
}
