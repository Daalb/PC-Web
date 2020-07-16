const express = require("express");
const EventController = require("../controllers/event");

//Middlewares
const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post("/set-event",EventController.setEvent);

module.exports = api;