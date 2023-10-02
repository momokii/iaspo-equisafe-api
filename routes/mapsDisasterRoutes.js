const router = require('express').Router()
const is_auth = require('../middleware/is-auth')
const is_admin = require('../middleware/role-checking').is_admin
const mapsDisasterController = require('../controllers/mapsDisasterController')

// * -------------------------------- routing

router.get('/:id_maps', is_auth, mapsDisasterController.getOneData)

router.get('/', is_auth, mapsDisasterController.getAllMapsData)

router.post('/', is_auth, is_admin, mapsDisasterController.postNewMapsData)

router.patch('/disasters', is_auth, is_admin, mapsDisasterController.editDisasterMapData)  

router.patch('/', is_auth, is_admin, mapsDisasterController.editMapsData)

router.delete('/', is_auth, is_admin, mapsDisasterController.deleteMapsData)

module.exports = router