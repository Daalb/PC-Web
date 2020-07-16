const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = Schema({
    nombre: String,
    lugar: String,
    fecha: String, //Revisar el tipo date
    tipo: String,
    asistentes: String
    /*TO DO revisar como almacenar un objeto*/ 
});

module.exports = mongoose.model("Event",EventSchema);