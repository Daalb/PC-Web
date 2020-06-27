const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

function signUp(req, res){
    const user = new User();

    const{ nombre, lastName, email, password, repeatPassword, phone, carrera } = req.body;

    //Asignaciones al modelo
    user.nombre = nombre;
    user.lastName = lastName; 
    user.email = email;
    user.phone = phone;
    user.carrera = carrera;
    user.role = "admin";
    user.active = false;

    console.log(req.body);
    
    if (!password || !repeatPassword){
        res.status(404).send({ message: "Las contraseñas son obligatorias."});
    } else {
        if (password !== repeatPassword){
            res.status(404).send({ message: "Las contraseñas tienen que ser iguales. "});
        } else{
            bcrypt.hash(password, null, null, function(err, hash){
                if (err) {
                    res.status(500).send({message: "Error al encriptar la contraseña"});
                }else{
                    //res.status(200).send({message: hash});
                    user.password = hash;//Asignación de la encriptación a el atributo password

                    user.save((err,userStored)=>{
                        if (err) {
                            res.status(500).send({message: "Error del servidor" + err});
                        } else {
                            if(!userStored) {
                                res.status(404).send({message: "Error al crear el usuario"});
                            } else{
                                res.status(200).send({user: userStored});
                            }
                        }
                    });
                }
            });
        }
    }
}

module.exports = {
    signUp
};