const cookieParser = require('cookie-parser');
const http = require('http');
const fs = require('fs')
const cors = require('cors')
const express = require('express');
const socketIo = require('socket.io');
const app = express();
require("dotenv").config();
const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { socketMiddleware } = require('./middleware/auth.socket');

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(cookieParser());
app.use('/static', express.static('uploads'))
app.use("/user", userRouter);



// this is socket work flow
const connectedUsers = {};

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.use(socketMiddleware);

io.on('connection', (socket) => {
    console.log("user connected with id " + socket.id);

    connectedUsers[socket.email] = { name: socket.user, id: socket.id, email: socket.email };

    io.emit("userList", Object.values(connectedUsers))

    io.emit("profile", { name: socket.user, id: socket.id, email: socket.email })

    socket.on('disconnect', () => {
        console.log(`User disconnected with ID: ${socket.id}`);
        connectedUsers[socket.email].id = null;
        io.emit("userList", Object.values(connectedUsers));
    });

    socket.on('message', async ({ sender, recipient, message }) => {
        try {
            if (!recipient || !sender) {
                return;
            } else {
                io.to(connectedUsers[recipient].id).emit('message', { sender, message });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', { message: 'Error sending message' });
        }
    });


    socket.on('recipientDetails', ({ email }) => {
        let user = connectedUsers[email]
        io.to(socket.id).emit('recipientDetails', { name: user?.name || "none" });
    });
});

server.listen(3000, async () => {
    try {
        await connection;
        console.log("connected to db")
        console.log("server is running at 3000")
    } catch (error) {
        return console.log(error)
    }
});
