const router = require('express').Router()
const is_auth = require('../middleware/is-auth')
const is_admin = require('../middleware/role-checking').is_admin
const videoController = require('../controllers/videoController')
const process_file = require('../middleware/file-upload')


// * -------------------------------- routing

router.get('/', is_auth,videoController.getAllVideo)

router.get('/:id_video', is_auth, videoController.getOneVideo)

router.post('/manual', is_auth, is_admin, videoController.post_video_manual)

router.post('/', is_auth, is_admin, process_file ,videoController.post_video)

router.patch('/:id_video/recent', is_auth, videoController.post_recent_video)

router.patch('/thumbnail', is_auth, is_admin, process_file, videoController.edit_video_thumbnail)

router.patch('/:id_video', is_auth, is_admin, process_file ,videoController.edit_video)

router.delete('/:id_video', is_auth, is_admin, videoController.delete_video)

module.exports = router