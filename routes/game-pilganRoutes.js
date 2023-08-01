const router = require('express').Router()
const gamePilganController = require('../controllers/gamePilganController')
const is_auth = require('../middleware/is-auth')
const is_admin = require('../middleware/role-checking').is_admin



// * -------------------------------- routing

router.get('/play', is_auth, gamePilganController.play_game)

router.get('/:id_question', is_auth, is_admin ,gamePilganController.get_one_question)

router.get('/', is_auth, is_admin, gamePilganController.get_all_question)

router.post('/play', is_auth, gamePilganController.play_game_post)

router.post('/', is_auth, is_admin, gamePilganController.post_question)

router.patch('/:id_question', is_auth, is_admin, gamePilganController.edit_question)

router.delete('/:id_question', is_auth, is_admin, gamePilganController.delete_question)

module.exports = router