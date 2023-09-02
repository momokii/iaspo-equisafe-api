const router = require('express').Router()
const is_auth = require('../middleware/is-auth')
const userController = require('../controllers/usersConrtoller')
const { body }  = require('express-validator')


// * -------------------------------- routing

router.get('/checks', is_auth, userController.check_username)

router.get('/self', is_auth, userController.get_info_self)

router.get('/:username', is_auth, userController.get_info)

router.patch('/password', is_auth, [
    body('new_password', "Password harus setidaknya gunakan 1 angka dan huruf kapital dengan minimal panjang 6 Karakter")
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 0
        })
],userController.change_password)

router.patch('/emergency', is_auth, userController.change_emegergency)

router.patch('/', is_auth, userController.change_info)



module.exports = router