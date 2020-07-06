const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/sign-up",UserController.signUp);//cuando se haga POST a la ruta se ejecuta la función 
api.post("/sign-in",UserController.singIn);
api.get("/users",[md_auth.ensureAuth],UserController.getUsers);
api.get("/users-active",[md_auth.ensureAuth],UserController.getUsersActive);


module.exports = api;