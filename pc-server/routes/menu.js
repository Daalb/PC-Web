const express = require("express");
const MenuController = require("../controllers/menu");

//Middleware
const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/add-menu",[md_auth.ensureAuth,MenuController.addMenu]);

module.exports = api;