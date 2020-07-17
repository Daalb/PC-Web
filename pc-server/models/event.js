const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = Schema({
    nombre: String,
    lugar: String,
    fecha: Date, //Revisar el tipo date, registra la fecha formato Unix
    tipo: String,
    asistentes:[Object]
    /*TO DO revisar como almacenar un objeto*/ 
});

module.exports = mongoose.model("Event",EventSchema);