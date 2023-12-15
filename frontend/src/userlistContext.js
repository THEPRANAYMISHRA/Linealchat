import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { socket } from './socket';

export const userlistContext = createContext("");
export const UserlistProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [myProfile, setMyProfile] = useState();
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        function onConnect() {
            console.log("we are now connected")
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
            console.log("Disconnected")
            alert("Please login again !!")
            navigate("/login");
        }

        function onUserList(payload) {
            setUserList(payload)
        }

        function onProfile(payload) {
            setMyProfile(payload)
        }

        function onAuthenticationFailed() {
            alert("Authentication Failed,Please login again !!")
            navigate("/login");
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('userList', onUserList)
        socket.on('profile', onProfile)
        socket.on('authenticationFailed', onAuthenticationFailed)
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [isConnected, navigate]);
    return (
        <userlistContext.Provider value={{ userList, myProfile, setMyProfile }}>{children}</userlistContext.Provider>
    )
}