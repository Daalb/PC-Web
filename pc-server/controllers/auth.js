import { locals } from '../app';

const jwt = require('../services/jwt');
const moment  = require('moment');
const User = require('../models/user');

function willExpireToken(token){
    const { exp } = jwt.decodeToke(token);
    const currentDate = moment().unix();

    if (currentDate> exp) {
        return true;//Caducó 
    }
    return false;
}

function refreshAcessToken(req, res){
    const { refreshToken } = req.body;//ojo
    const isTokenExpired = willExpireToken(refreshToken);
    
    if (isTokenExpired){
        res.status(404).send({message: "El refreshToken ha expirado"});
    } else {
        const { id } = jwt.decodeToke(refreshToken);
        User.findOne({_id:id}, (err,userStored) => {
            if (err) {
                res-status(500).send({message: "Error del servidor"});
            } else {
                if (!userStored) {
                    res.status(404).send({message: "Usuario no encontrado"});
                } else {
                    res.status(200).send(
                       { accessToken: jwt.createAccessToken(userStored),
                        refreshToken: refreshToken} 
                    );
                }
            }
        });

    }
    
}



module.exports = {
    refreshAcessToken
};