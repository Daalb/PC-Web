const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

api.post("/sign-up",UserController.signUp);//cuando se haga POST a la ruta se ejecuta la función 
api.post("/sign-in",UserController.singIn);

module.exports = api;