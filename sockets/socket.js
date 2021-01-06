const { io } = require('../index');

const Bands = require('../models/Bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('unitoon'));
bands.addBand(new Band('bandaLechuga'));
bands.addBand(new Band('rock'));
bands.addBand(new Band('reguetoon'));
bands.addBand(new Band('cumbia'));
bands.addBand(new Band('salsa'));




//Mensaje de Socket
io.on('connection', client => {
    console.log("Cliente conectado");
   
    
    client.emit('active-bands',bands.getBands());


client.on('disconnect', () => {
    console.log("Cliente desconectado!");
 });

client.on('mensajito',(payload)=>{
    console.log("Escuchando desde el servidor el mensaje",payload.nombre);

    io.emit("mensajeserver",{admin:'Nuevo mensaje'});
});

 
client.on('emitidor-mensaje',(payload)=>{
    //io.emit('nuevo-mensaje',payload); //emite a todos
    client.broadcast.emit('nuevo-mensaje',payload);// emite a todos menos al que emitio
});

client.on("emitir-mensaje",(payload)=>{
    console.log(payload);
    client.broadcast.emit('nuevo-mensaje',payload);
});


client.on('vote-band',(payload)=>{
    //console.log("id",payload.id);
     bands.voteBand(payload.id);
     io.emit('active-bands',bands.getBands());
});


client.on('add-band',(payload)=>{
   //console.log("nombre",payload.name);
   bands.addBand(new Band(payload.name));
   io.emit('active-bands',bands.getBands());
});

client.on('delete-band',(payload)=>{
    //console.log("nombre",payload.name);
    bands.deleteBand(payload.id);
    io.emit('active-bands',bands.getBands());
 });


});