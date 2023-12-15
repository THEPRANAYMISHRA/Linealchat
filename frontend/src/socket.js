import { io } from 'socket.io-client';
const baseurl = 'http://localhost:3000';

const isTokenPresent = localStorage.getItem("marschattoken");

export const socket = io(baseurl, {
    query: {
        token: isTokenPresent,
    }
});