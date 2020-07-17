const Event = require('../models/event');

function setEvent(req, res){
    const event = new Event();

    const { nombre, lugar , fecha, tipo, asistentes } = req.body;

    event.nombre = nombre;
    event.lugar = lugar;
    event.fecha = fecha;
    event.tipo = tipo;
    event.asistentes = asistentes

  // console.log(asistentes[0]); 
  /* event.asistentes.nombre = asistentes.nombre;
    event.asistentes.apellido = asistentes.apellido;
   event.asistentes.correo = asistentes.correo;*/

   
    event.save((err,eventStored) => {
        if (err) {
            console.log(err);
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


function addAssistant(req,res){
    let eventData = req.body;
    const params = req.params;

    Event.findById({_id:params.id}, (err,eventUpdate) => {
        if (err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if (!eventUpdate) {
                res.status(404).send({message: "No se ha encontrado el evento."});
            } else {
                let assistant = {nombre: eventData.nombre, apellido: eventData.apellido, correo: eventData.correo}
                Event.findByIdAndUpdate({_id: params.id},{$push: {asistentes: assistant}}, (err) => {
                    if (err) {
                        res.status(500).send({message: "Error al agregar asistente."});
                    }
                }); 
               
            }
        }
    });

}


module.exports = {
    setEvent,
    addAssistant
};