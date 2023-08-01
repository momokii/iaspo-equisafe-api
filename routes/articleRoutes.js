const router = require('express').Router()
const is_auth = require('../middleware/is-auth')
const articleController = require('../controllers/articleController')


// * -------------------------------- routing

router.get('/',is_auth, articleController.getAllArticle)

router.get('/:id_article',  is_auth, articleController.getOneArticle)



module.exports = router