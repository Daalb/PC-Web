const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = Schema({
    nombre: String,
    lugar: String,
    fecha: String, //DD/MM/AA- HH1:MM1 - HH2:MM2
    tipo: String,
    asistentes:[{
        nombre: String,
        apellido: String,
        correo: String 
    }]
    
});

module.exports = mongoose.model("Event",EventSchema);