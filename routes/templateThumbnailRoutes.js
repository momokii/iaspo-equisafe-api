const router = require('express').Router()
const is_auth = require('../middleware/is-auth')
const is_admin = require('../middleware/role-checking').is_admin
const process_file = require('../middleware/file-upload')

const templateThumbnailController = require('../controllers/templateThumbnailController')

// * -------------------------------- routing

router.get('/', is_auth, templateThumbnailController.getAllTemplate)

router.get('/:id_template', is_auth, templateThumbnailController.getOneData)

router.patch('/', is_auth, is_admin, process_file, templateThumbnailController.updateData)

module.exports = router