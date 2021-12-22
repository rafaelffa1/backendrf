const socketio = require('socket.io');

let io;
let connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        const { usuario = null, restaurante = null } = socket.handshake.query;

        if (usuario !== null) {
            connections.push({
                id: socket.id,
                usuario,
                restaurante
            });
        }

        if (restaurante !== null) {
            connections.push({
                id: socket.id,
                usuario,
                restaurante
            });
        }

        console.warn('@@@@@@@@@@@@@@@@ PiNG \n')
        console.warn(connections)
        console.warn('@@@@@@@@@@@@@@@@ PoNG \n')
    });
};

exports.findConnections = (usuario) => {
    return connections.filter(connection => {
        return connection.usuario == usuario;
    });
};

exports.findConnectionsRestaurant = (restaurante) => {
    return connections.filter(connection => {
        return connection.restaurante == restaurante;
    });
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
};