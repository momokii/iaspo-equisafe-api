const router = require('express').Router()
const gameJawabanSingkatController = require('../controllers/gameJawabanController')
const is_auth = require('../middleware/is-auth')
const is_admin = require('../middleware/role-checking').is_admin
const process_file = require('../middleware/file-upload')


// * -------------------------------- routing

router.get('/play', is_auth, gameJawabanSingkatController.play_game)

router.get('/:id_question', is_auth, is_admin, gameJawabanSingkatController.get_one_question)

router.get('/', is_auth, is_admin, gameJawabanSingkatController.get_all_question)

router.post('/play', is_auth, gameJawabanSingkatController.play_game_post)

router.post('/', is_auth, is_admin, process_file, gameJawabanSingkatController.post_question)

router.patch('/:id_question', is_auth, is_admin, process_file, gameJawabanSingkatController.edit_question)

router.delete('/:id_question', is_auth, is_admin, gameJawabanSingkatController.delete_question)


module.exports = router