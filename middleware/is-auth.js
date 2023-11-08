require('dotenv').config()
const jwt = require('jsonwebtoken')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const User = require('../models/user')

function throw_err(msg, code) {
    const err = new Error(msg)
    err.statusCode = code
    throw err
}

module.exports = async (req, res, next) => {
    try {
        

        const authHeader = req.get('Authorization')
        if(!authHeader){
            throw_err('Butuh Header Autentikasi', statusCode['401_unauthorized'])
        }

        const token = authHeader.split(' ')[1]

        const decode_token = jwt.verify(token, process.env.JWT_TOKEN)
        if(!decode_token){
            throw_err('Token Tidak Valid', statusCode['401_unauthorized'])
        }

        const user = await User.findById(decode_token.userId)
        if(!user){
            throw_err('Token Tidak Valid', statusCode['401_unauthorized'])
        }

        if(user.token.auth !== decode_token.auth){
            throw_err('Token Tidak Valid', statusCode['401_unauthorized'])
        }

        req.userId = decode_token.userId
        req.username = user.username
        req.role = user.role

        next()
    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}