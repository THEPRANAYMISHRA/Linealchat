const jwt = require('jsonwebtoken');

const socketMiddleware = async (socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
        return next(new Error('Authentication failed. No token provided.'));
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN);
        socket.user = decoded.name;
        socket.email = decoded.email;
        next();
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                socket.emit('authenticationFailed', { message: 'Token expired. Please log in again.' });
                break;
            case 'JsonWebTokenError':
                socket.emit('authenticationFailed', { message: 'Invalid token format.' });
                break;
            default:
                console.error(`Unexpected JWT error: ${error}`);
                break;
        }

        // Close connection on any error
        return socket.disconnect();
    }
};

module.exports = { socketMiddleware };
