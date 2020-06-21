const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

api.post("/sing-up",UserController.signUp);//cuando se haga POST a la ruta se ejecuta la función 

module.exports = api;