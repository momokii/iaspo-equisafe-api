const router = require('express').Router()
const authController = require('../controllers/authConrtoller')
const is_auth = require('../middleware/is-auth')
const User = require('../models/user')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const { body } = require('express-validator')


function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}


// * -------------------------------- routing

router.post('/login', authController.login)

router.post('/signup', [
    body('username', 'Username sudah digunakan, coba username lain')
        .isAlphanumeric()
        .isLength({min: 5})
        .custom((value, {req}) => {
            return (async () => {
                const user = await User.findOne({
                    username : value
                })
                if(user){
                    throw_err(
                        "Username sudah digunakan, coba username lain",
                        statusCode['401_unauthorized'] )
                }
            })()
        }),
    body('password', "Password harus setidaknya gunakan 1 angka dan huruf kapital dengan minimal panjang 6 Karakter")
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 0
        })
],authController.signup)


router.post('/logout', is_auth,authController.logout)



module.exports = router