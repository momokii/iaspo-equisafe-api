require('dotenv').config()
const User = require('../models/user')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')



// * -------------------------------- routing

function throw_err(msg, code) {
    const err = new Error(msg)
    err.statusCode = code
    throw err
}



exports.signup = async (req, res, next) => {
    try{
        const err_val = validationResult(req)
        if(!err_val.isEmpty()){
            const err_view = err_val.array()[0].msg
            const err = new Error('Signup Failed - ' + err_view)
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const username = req.body.username
        const password = req.body.password
        const hash_password = await bcrypt.hash(password, 16)
        const name = req.body.name
        const emergency_name = req.body.emergency_name
        let emergency_telp = req.body.emergency_telp.toString()

        if(emergency_telp.startsWith("0")){
            emergency_telp = emergency_telp.slice(1)
        }

        const new_user = new User({
            username : username,
            password : hash_password,
            name : name,
            emergency_contact: {
                name: emergency_name,
                no_telp: emergency_telp
            }
        })

        await new_user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success create new account'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.login = async (req, res, next) => {
    try{
        const username = req.body.username
        const password = req.body.password

        const user = await User.findOne({
            username: username
        })
        if(!user){
            throw_err('Wrong Username / Password', statusCode['400_bad_request'])
        }

        const check_pass = await bcrypt.compare(password, user.password)
        if(!check_pass){
            throw_err("Wrong Username / Password", statusCode['400_bad_request'])
        }

        const random_token = crypto.randomBytes(32).toString('hex')
        const access_token = jwt.sign({
            userId: user._id.toString(),
            //username: user.username,
            auth: random_token
        }, process.env.JWT_TOKEN)

        user.token.auth = random_token
        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Login Success',
            data: {
                access_token : access_token,
                token_type: 'Bearer'
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.logout = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user){
            throw_err("Token not valid", statusCode['401_unauthorized'])
        }
        user.token.auth = null
        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Logout'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}