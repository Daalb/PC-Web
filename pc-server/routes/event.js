const express = require("express");
const EventController = require("../controllers/event");

//Middlewares
const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post("/set-event",[md_auth.ensureAuth],EventController.setEvent);

module.exports = api;