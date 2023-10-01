const router = require('express').Router()
const is_auth = require('../middleware/is-auth')
const articleController = require('../controllers/articleController')
const is_admin = require("../middleware/role-checking").is_admin
const process_file = require('../middleware/file-upload')


// * -------------------------------- routing

router.get('/',is_auth, articleController.getAllArticle)

router.get('/:id_article',  is_auth, articleController.getOneArticle)

router.post('/', is_auth, is_admin, process_file, articleController.postNewArticle)

router.patch('/:id_article/delete-thumbnail', is_auth, is_admin, articleController.deleteArticleImages)

router.patch('/:id_article', is_auth, process_file, is_admin, articleController.editArticle)

router.delete('/:id_article', is_auth, is_admin, articleController.deleteArticle)


module.exports = router