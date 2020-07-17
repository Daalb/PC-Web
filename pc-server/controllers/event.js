const Event = require('../models/event');

function setEvent(req, res){
    const event = new Event();

    const { nombre, lugar , fecha, tipo, asistentes } = req.body;

    event.nombre = nombre;
    event.lugar = lugar;
    event.fecha = fecha;
    event.tipo = tipo;
    event.asistentes.push(asistentes)
   console.log(asistentes[0]); 
  /* event.asistentes.nombre = asistentes.nombre;
    event.asistentes.apellido = asistentes.apellido;
   event.asistentes.correo = asistentes.correo;*/

    event.save((err,eventStored) => {
        if (err) {
            res.status(500).send({message: "El evento ya existe."});
        } else {
            if (!eventStored) {
                res.status(404).send({message:"Error al crear el evento."});
            } else {
                res.status(200).send({message: "El evento ha sido creado correctamente."})
            }
        }
    });

}


module.exports = {
    setEvent
};