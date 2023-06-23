const express = require('express');
const cors = require('cors');
const { socketController } = require('./sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = 8080;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {
       
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io))
    }

    routes() {

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
