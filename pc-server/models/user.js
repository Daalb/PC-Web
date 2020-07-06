const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
    nombre: String,
    lastName: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    phone: String,
    carrera: String,
    role: String,
    active: Boolean,
    avatar: String
});

module.exports = mongoose.model("User",UserSchema);