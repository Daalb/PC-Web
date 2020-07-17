const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = Schema({
    nombre: String,
    lugar: String,
    fecha: Date, //Revisar el tipo date
    tipo: String,
    asistentes: {
        nombre: String,
        apellido: String,
        correo: {
            type: String,
            unique: true
        }
    }
    /*TO DO revisar como almacenar un objeto*/ 
});

module.exports = mongoose.model("Event",EventSchema);