const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const user = require("../models/user");

function signUp(req, res){
    const user = new User();

    const{ nombre, lastName, email, password, repeatPassword, phone, carrera } = req.body;

    //Asignaciones al modelo
    user.nombre = nombre;
    user.lastName = lastName; 
    user.email = email.toLowerCase();
    user.phone = phone;
    user.carrera = carrera;
    user.role = "admin";
    user.active = false;

    //console.log(req.body);
    
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
                            res.status(500).send({message: "El usuario ya existe" });
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

function singIn(req,res){
   const params = req.body;
   const email = params.email.toLowerCase();
   const password = params.password;

   User.findOne({email} ,(err, userStored )=> {//Haciendo uso de mongoose
       if (err){
           res.status(500).send({message: "Error del servidor"});
       } else {
           if (!userStored) {
               res.status(404).send({message: "Usuario no encontrado"});
           } else {
               bcrypt.compare(password,userStored.password, (err,check)=>{
                if (err){
                    res.status(500).send({message: "Error del servidor"});
                } else if (!check) {
                    res.status(404).send({message: "La contraseña es incorrecta"});
                } else {
                    if (!userStored.active) {
                        res.status(200)
                        .send({code: 200, message: "El usuario no está activo, contactar con un administrador"})
                    } else {
                        res.status(200).send({
                            accessToken: jwt.createAccessToken(userStored),
                            refreshToken: jwt.createRefreshToken(userStored)
                        })
                    }
                }

               })
           }
       }
   })
  
   
}

function getUsers(req,res){
    User.find().then(users =>{
        if (!users) {
            res.status(404).send({message: "No se ha encontrado ningún usuario."})
        } else {
            res.status(200).send({users})
        }
    }); 
}
module.exports = {
    signUp,
    singIn,
    getUsers
};