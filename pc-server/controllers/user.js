//Packages
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");
const path = require("path");

//Services
const jwt = require("../services/jwt");

//Modles
const User = require("../models/user");
//const user = require("../models/user");

function signUp(req, res){
    const user = new User();

    const{ nombre, lastName, email, password, repeatPassword, phone, carrera} = req.body;

    //Asignaciones al modelo
    user.nombre = nombre;
    user.lastName = lastName; 
    user.email = email.toLowerCase();
    user.phone = phone;
    user.carrera = carrera.toLowerCase();
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
            console.log(users)
        }
    }); 
}

function getUsersActive(req,res){
    const query = req.query;

    User.find({ active: query.active }).then(users =>{
        if (!users) {
            res.status(404).send({message: "No se ha encontrado ningún usuario."})
        } else {
            res.status(200).send({users})
        }
    }); 
}

function uploadAvatar(req,res){//Subir avatar al server
    const params = req.params;

    User.findById({_id: params.id}, (err, userData) => {
         if (err) {
             res.status(500).send({message: "Error del servidor."});
         } else {
             if (!userData) {
                 res.status(404).send({message: "No se ha encontrado ningún usuario"});
             } else {
                let user = userData;
                if (req.files) {
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split("\\");
                    let fileName = fileSplit[2];//Obtener el nombre(id) de la imagen
                    console.log(fileName);
                    

                    let extSplit = fileName.split("."); //Obtener la extensión
                    let fileExt = extSplit[1];

                    if (fileExt !== "png" && fileExt !== "jpg") {
                        res.status(400).send({message: 
                            "La extensión de la imagen no es valida. (Extenciones permitidas: .png y .jpg)"});
                    } else {
                        user.avatar = fileName;
                        User.findByIdAndUpdate({_id: params.id}, user, (err, userResult) =>{
                            if (err) {
                                res.status(500).send({message: "Error de servidor."});
                            } else {
                                if(!userResult) {
                                    res.status(404).send({message: "No se ha encontrado nigún usuario."})
                                } else {
                                    res.status(200).send({avatarName: fileName});

                                }
                            }
                        });
                    }
                }
                
             }
         }
    })
    
}

function getAvatar(req,res){//Obtener avatar del server
   const avatarName = req.params.avatarName;
   const filePath = "./uploads/avatar/" + avatarName;

   fs.exists(filePath,exists => {
       if (!exists) {
           res.status(404).send({message: "El avatar que buscas no existe"});
       } else {
            res.sendFile(path.resolve(filePath));
       }
   });
    
}

async function updateUser(req,res){
    let userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;//Parametros que vienen en la url

    if (userData.password) {
        await bcrypt.hash(userData.password,null,null,(err,hash) => {
            if (err) {
                res.status(500).send({message: "Error al encriptar la contraseña"})
            } else {
                userData.password = hash;
            }
        });
    };

    User.findByIdAndUpdate({_id: params.id}, userData, (err, userUpdate) => {
        if (err) {
            res.status(500).send({message: "Error del servidor"});
        } else {
            if (!userUpdate) {
                res.status(404).send({message: "No se ha encontrado ningún usuario"});
            } else {
                res.status(200).send({message: "Usuario actualizado correctamente"});
            }
        }
    })
    
}

function activateUser(req,res){
    const { id } = req.params;
    const { active } = req.body;
    
    User.findByIdAndUpdate(id, { active }, (err,userStored) =>{
        if (err) {
            res.status(500).send({message: "Error de servidor."});
        } else {
            if (!userStored) {
                res.status(404).send({message: "No se ha encontrado el usuario."});
            } else {
                if (active === true) {
                    res.status(200).send({message: "El usuario ha sido activado correctamente."});
                } else {
                    res.status(200).send({message: "El usuario se ha desactivado correctamente."});
                }
            }
        }
    });
}

function deleteUser(req,res){
    const { id } = req.params;
    User.findByIdAndDelete(id,(err, userDeleted) => {
        if (err) {
            res.status(500).send({message: "Error de servidor."});
        } else {
            if (!userDeleted) {
                res.status(404).send({message: "No se ha encontrado el usuario."})
            } else {
                
                res.status(200).send({message: "El usuario se ha elimando."})
            }
        }
    });
}

function signUpAdmin(req,res){
    const user = new User();

    const { nombre, lastName, email, password, phone, carrera, role } = req.body;
    user.nombre = nombre;
    user.lastName = lastName; 
    user.email = email.toLowerCase();
    user.phone = phone;
    user.carrera = carrera.toLowerCase();
    user.role = role;
    user.active = true; //Creación de usuarios desde panel de admin siempre activos

    if (!password) {
        res.status(500).send({message: "La contraseña es obligatoria"})
    } else{ 
        bcrypt.hash(password,null,null, (err,hash) => {
            if (err) {
                res.status(500).send({message: "Error al encriptar contraseña."})
            } else {
                user.password = hash;

                user.save((err,userStored) => {
                    if (err) {
                        res.status(500).send({message: "El usuario ya existe."});
                    } else {
                        if (!userStored) {
                            res.status(500).send({message: "Error al crear el nuevo usuario."});
                        } else {
                            res.status(200).send({message: "Usuario creado correctamente."});
                        }
                    }
                }) 
            }
        });
    }

   
}

function getAttendance(req,res){
    console.log("Estoy en asistencia");
}

module.exports = {
    signUp,
    singIn,
    getUsers,
    getUsersActive,
    uploadAvatar,
    getAvatar,
    updateUser,
    activateUser,
    deleteUser,
    signUpAdmin,
    getAttendance
};