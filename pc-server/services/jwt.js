const jwt = require("jwt-simple");
const moment = require("moment");
const user = require("../models/user");

const SECRET_KEY = "2QRTqCZSbAXVVkXip2juceXp57R5pD";


exports.createAccessToken = function (user) {
        const payload = {
            id: user._id,
            nombre: user.nombre,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            carrera: user.carrera,
            role: user.role,
            createToken: moment().unix(),
            exp: moment().
            add(3, "hours")
            .unix()
        };

        return jwt.encode(payload,SECRET_KEY);
}

exports.createRefreshToken = function(user){
    const payload = {
        id: user._id,
        exp: moment()
        .add(30, "days")
        .unix()
    };
    
    return jwt.encode(payload,SECRET_KEY);
}

exports.decodeToke = function(token){
    return jwt.decode(token,SECRET_KEY, true);
}
