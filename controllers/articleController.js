require('dotenv')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const Article = require('../models/article')
const fileController = require('../controllers/fileController')
const mongoose = require('mongoose')

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
            .select('title author source pic content')
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

        all_article = all_article.map(doc => {
            // * ketika artikel tidak punya gambar, maka dapat balikan/ berikan gambar template
            if(doc.pic === null){
                doc.pic = process.env.DEFAULT_PIC_ARTICLE
            }
            return doc
        })

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
            throw_err("Article data not found", statusCode['404_not_found'])
        }

        const article = await Article.findById(id_article)
            .select('title author source pic content')
        if(!article){
            throw_err("Article data not found", statusCode['404_not_found'])
        }

        if(article.pic === null){
            article.pic = process.env.DEFAULT_PIC_ARTICLE
        }

        let random_article = await Article.aggregate([
            { $match: { _id: { $ne: id_article } } },
            { $sample: { size: 1 } } 
            ])
        random_article = random_article[0]

        console.log(random_article)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get Article Data',
            data: {
                article: article,
                recomendation_article: {
                    _id: random_article._id,
                    title: random_article.title,
                    author: random_article.author,
                    source: random_article.source,
                    pic: random_article.pic,
                    content: random_article.content
                }
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postNewArticle = async (req, res, next) => {
    try{
        const title = req.body.title
        const author = req.body.author
        const source = req.body.source
        const content = req.body.content
        let pic = null

        // * ketika ada file di upload / gunakan gambar
        if(req.file) {

            const ext_allowed = ['jpg', 'jpeg', 'png', 'gif']
            const file_name = req.file.originalname.split('.')
            const file_ext = file_name[file_name.length - 1]
            if(!ext_allowed.includes(file_ext)){
                throw_err("File extension allowed only jpg, jpeg, png, gif", statusCode['400_bad_request'])
            }

            req.type = 'article'
            pic = await fileController.uploadFile(req)
        } else{
            // * gunakan template foto 
            pic = process.env.DEFAULT_PIC_ARTICLE
        }

        // * new article
        const new_article = new Article({
            title: title,
            author: author,
            source: source,
            content: content,
            pic: pic
        })

        await new_article.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success add new Article'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editArticle = async (req, res, next) => {
    try{
        const id_artikel = req.params.id_article
        const article = await Article.findById(id_artikel)
        if(!article){
            throw_err("Article data not found", statusCode['404_not_found'])
        }

        req.type = 'article'
        req.file_url = article.pic

        // * misal bisa gunakan query untuk hapus gambar saja -> jadi akan ubah gambar jadi null
        if(req.query.del_pic === 'true' && (article.pic !== process.env.DEFAULT_PIC_ARTICLE)){
            const del_pic = await fileController.deleteItem(req)

            // * jika proses hapus gagal
            if(!del_pic){
                return throw_err("Edit process article failed", statusCode['400_bad_request'])
            }

            article.pic = process.env.DEFAULT_PIC_ARTICLE
        }
        // * ------------------ ------------------ ------------------

        const new_title = req.body.title
        const new_author = req.body.author
        const new_source = req.body.source
        const new_content = req.body.content

        // * ketika gambar diubah menjadi gambar lain
        if(req.file && req.query.del_pic !== 'true'){
            
            const ext_allowed = ['jpg', 'jpeg', 'png', 'gif']
            const file_name = req.file.originalname.split('.')
            const file_ext = file_name[file_name.length - 1]
            if(!ext_allowed.includes(file_ext)){
                throw_err("File extension allowed only jpg, jpeg, png, gif", statusCode['400_bad_request'])
            }

            if(article.pic !== process.env.DEFAULT_PIC_ARTICLE){
                const del_pic = await fileController.deleteItem(req)

                // * jika proses hapus gagal
                if(!del_pic){
                    return throw_err("Edit process article failed", statusCode['400_bad_request'])
                }
            }

            let pic = await fileController.uploadFile(req)

            article.pic = pic
        }
        // * ------------------ ------------------ ------------------ 

        article.title = new_title
        article.author = new_author
        article.source = new_source
        article.content = new_content

        await article.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Succes edit article'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteArticleImages = async (req, res, next) => {
    try{
        const id_artikel = req.params.id_article
        const article = await Article.findById(id_artikel)
        if(!article){
            throw_err("Article data not found", statusCode['404_not_found'])
        }

        req.type = 'article'
        req.file_url = article.pic

        if(article.pic !== process.env.DEFAULT_PIC_ARTICLE){
            const del_pic = await fileController.deleteItem(req)
            // * jika proses hapus gagal
            if(!del_pic){
                return throw_err("Edit process article failed", statusCode['400_bad_request'])
            }

            article.pic = process.env.DEFAULT_PIC_ARTICLE
            await article.save()
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success delete article thumbnail'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}   





exports.deleteArticle = async (req, res, next) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const del_article = await Article.findById(req.params.id_article)
        if(!del_article){
            throw_err("Article data not found", statusCode['404_not_found'])
        }

        if(del_article.pic !== process.env.DEFAULT_PIC_ARTICLE) {
            req.type = 'article'
            req.file_url = del_article.pic
            await fileController.deleteItem(req)
        }

        await Article.findByIdAndDelete(req.params.id_article)

        await session.commitTransaction()
        session.endSession()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success delete Article'
        })

    } catch (e) {
        await session.abortTransaction()
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}