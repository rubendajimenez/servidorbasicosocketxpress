const { io } = require('../index');

//Mensaje de Socket
io.on('connection', client => {
    console.log("Cliente conectado");

client.on('disconnect', () => {
    console.log("Cliente desconectado!");
 });

client.on('mensajito',(payload)=>{
    console.log("Escuchando desde el servidor el mensaje",payload.nombre);

    io.emit("mensajeserver",{admin:'Nuevo mensaje'});
});
});