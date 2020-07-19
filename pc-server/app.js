const express = require("express");
const bodyParser = require("body-parser");

const app =express();
const { API_VERSION } = require('./config');

//Load routings
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const menuRoutes = require('./routes/menu');
const api = require("./routes/menu");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//Basic Routes
app.use(`/api/${API_VERSION}`,authRoutes);
app.use(`/api/${API_VERSION}`,userRoutes);
app.use(`/api/${API_VERSION}`,eventRoutes);
api.use(`/api/${API_VERSION}`,menuRoutes);

module.exports = app;