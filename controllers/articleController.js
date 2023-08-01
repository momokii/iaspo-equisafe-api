const statusCode = require('../utils/http-response').httpStatus_keyValue
const Article = require('../models/article')


// * -------------------------------- routing

function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}


exports.getAllArticle = async (req, res, next) => {
    try{
        const total_data = await Article.find().countDocuments()
        // * karena pake search -> maka tidak gunakan skip/limit pada proses query dan dilakukan secara manual dengan urutan | query -> filter search -> pagination
        let all_article = await Article.find()
        const response = {
            errors: false,
            message: 'Get Article Data',
            data: {
                total_data : total_data
            }
        }

        // * pagination
        const current_page = parseInt(req.query.page) || 1
        const per_page = parseInt(req.query.per_page) || 5
        const start_data = (current_page - 1) * per_page


        // * search
        if(req.query.search){
            const q = req.query.search.toString().trim().toLowerCase()
            if(q){
                all_article = all_article.filter(doc => {
                    return doc.title.toLowerCase().includes(q)
                })
            }
        }

        all_article = all_article.slice(start_data, start_data + per_page)

        response.data = {
            ...response.data,
            current_page : current_page,
            per_page: per_page,
            articles: all_article
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getOneArticle = async (req, res, next) => {
    try{
        const id_article = req.params.id_article
        if(!id_article){
            throw_err("Artikel Tidak Ditemukan", statusCode['404_not_found'])
        }

        const article = await Article.findById(id_article)
        if(!article){
            throw_err("Artikel Tidak Ditemukan", statusCode['404_not_found'])
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get Article Data',
            data: article
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}