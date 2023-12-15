import React, { useState, useEffect, useRef } from 'react'
import './chatscreen.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { socket } from '../../socket';

export default function ChatScreen() {
    const [messageInput, setMessageInput] = useState("");
    const messageContainerRef = useRef(null);
    const [searchParams] = useSearchParams();
    const [talkingTo, setTakingTo] = useState("User");
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        const payload = {
            sender: socket.id,
            recipient: searchParams.get('q'),
            message: messageInput
        };
        setMessages((prevMessages) => [...prevMessages, payload]);
        socket.emit('message', payload);
    }

    const handleBackButton = () => {
        navigate('/chats')
    }
    // Fetch messages 
    useEffect(() => {
        function onMessage(payload) {
            setMessages((prevMessages) => [...prevMessages, payload]);
        }

        function onRecipientDetails(data) {
            setTakingTo(data.name);
        }

        socket.on('recipientDetails', onRecipientDetails);
        socket.on('message', onMessage);
        socket.emit('recipientDetails', { email: searchParams.get('q') });

        return () => {
            socket.off('message', onMessage);
        };
    }, []);


    function getCurrTime() {
        var now = new Date();
        var pretty = [
            now.getHours(),
            ':',
            now.getMinutes()
        ].join('');
        return pretty
    }

    return (
        <div className="bg-danger" id="mainBox">
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className="container-fluid d-flex justify-content-start align-items-center gap-2">
                    <button className='btn btn-secondary' onClick={handleBackButton}><i className='bx bx-left-arrow-alt'></i></button>
                    <i className='bx bxs-user-circle fs-1'></i>
                    <span className='fs-5'>{talkingTo}</span>
                </div>
            </nav>
            <section className="msgBox" id="msgBox" ref={messageContainerRef}>
                {/* <!-- messages will be here --> */}
                {messages ? messages.map((message) => (
                    !message.recipient ?
                        <div className='receivedmsg' key={message.id}>
                            <span>{message.message}</span>
                            <span className='messagetimestamp'>{getCurrTime()}</span>
                        </div> : <div className='sentmsg' key={message.id}>
                            <span>{message.message}</span>
                            <span className='messagetimestamp'>{getCurrTime()}</span>
                        </div>

                )) : null}
            </section>
            <form onSubmit={handleMessageSubmit}>
                <input type="text" className='rounded' placeholder="Enter message" id="inputmsg" onChange={(e) => setMessageInput(e.target.value)} />
                <label for="uploadImage"><i className="bx bxs-photo-album"></i></label>
                <input type="file" id="uploadImage" />
                <button
                    type="submit"
                    className="d-flex justify-content-center align-items-center btn btn-danger"
                >
                    <i className="bx bxs-send"></i>
                </button>
            </form>
        </div>
    )
}
