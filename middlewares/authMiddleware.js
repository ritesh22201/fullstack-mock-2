const BlackListModel = require("../models/blacklistModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
       return res.status(400).send({msg : 'Token not found!'});
    }
    
    const blacklisteduser = await BlackListModel.findOne({token});
    if(blacklisteduser){
        return res.status(400).send({ msg: 'Token revoked' });
    }

    jwt.verify(token, process.env.secretKey, async(err, decoded) => {
        if(err){
        return res.status(400).send({ msg: 'Token not valid!' });
        }
        else{
            req.body.userId = decoded.userId;
            req.body.username = decoded.username;
            next();
        }
    })

}

module.exports = auth;