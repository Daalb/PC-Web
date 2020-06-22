const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    lastName: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean
});

module.exports = mongoose.model("User",UserSchema);