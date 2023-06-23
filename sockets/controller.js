
const socketController = async( socket = new Socket(), io ) => {

    if (socket.handshake.headers['x-token']){
        console.log('Cliente Autorizado Conectado',socket.handshake.headers['x-token']);
        const uid=socket.handshake.headers['x-token'];
        socket.join( uid );
    }else{
        console.log("no token")
        socket.disconnect();
    }

    socket.on('enviarMensaje',(idR)=>{
        console.log('enviando mensaje');
        socket.to(idR).emit('escucharMensaje')
    });

}

module.exports = {
    socketController
}

