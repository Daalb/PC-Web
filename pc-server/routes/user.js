const express = require("express");
const multipart = require("connect-multiparty");
const UserController = require("../controllers/user");

//Middlewares
const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multipart({uploadDir:"./uploads/avatar"}); //Arrastra la imagen a la carpeta uploads/avatar

const api = express.Router();

api.post("/sign-up",UserController.signUp);//cuando se haga POST a la ruta se ejecuta la función 
api.post("/sign-in",UserController.singIn);
api.get("/users",[md_auth.ensureAuth],UserController.getUsers);
api.get("/users-active",[md_auth.ensureAuth],UserController.getUsersActive);
api.put("/upload-avatar/:id",[md_auth.ensureAuth, md_upload_avatar],UserController.uploadAvatar);
api.get("/get-avatar/:avatarName",UserController.getAvatar);//Cualquier usuario puede ver el avatar aunque no esté logeado


module.exports = api;