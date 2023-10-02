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
                doc.pic = "https://storage.googleapis.com/prjct-ie-dev-01/templates/article-default.png"
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
            throw_err("Artikel Tidak Ditemukan", statusCode['404_not_found'])
        }

        const article = await Article.findById(id_article)
            .select('title author source pic content')
        if(!article){
            throw_err("Artikel Tidak Ditemukan", statusCode['404_not_found'])
        }

        if(article.pic === null){
            article.pic = "https://storage.googleapis.com/prjct-ie-dev-01/templates/article-default.png"
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
        // * set awal untuk gambar gunakan null
        // * baru nanti di bawah di cek ketika ada file diupload berarti akan direplace dengan gambar baru
        let pic = null
        // * jadi, ketika get data -> ketika nilai pic -> null
        // * maka akan diberikan link ke gambar template untuk article

        // * ketika ada file di upload
        if(req.file) {
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
            message: 'Sukses add new Article'
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
            throw_err("Artikel tidak ditemukan", statusCode['404_not_found'])
        }

        req.type = 'article'
        req.file_url = article.pic

        // * misal bisa gunakan query untuk hapus gambar saja -> jadi akan ubah gambar jadi null
        if(req.query.del_pic === 'true' && article.pic){
            const del_pic = await fileController.deleteItem(req)

            // * jika proses hapus gagal
            if(!del_pic){
                return throw_err("Proses edit artikel gagal", statusCode['400_bad_request'])
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
            // * misal sebelumnya sudah ada gambar -> maka gambar sebelumnya akan direplace dahulu dengan hapus data gambar sebelumnya
            if(article.pic){
                const del_pic = await fileController.deleteItem(req)

                // * jika proses hapus gagal
                if(!del_pic){
                    return throw_err("Proses edit artikel gagal", statusCode['400_bad_request'])
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
            throw_err("Artikel tidak ditemukan", statusCode['404_not_found'])
        }

        req.type = 'article'
        req.file_url = article.pic

        const del_pic = await fileController.deleteItem(req)
        // * jika proses hapus gagal
        if(!del_pic){
            return throw_err("Proses edit artikel gagal", statusCode['400_bad_request'])
        }

        article.pic = process.env.DEFAULT_PIC_ARTICLE

        await article.save()

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
            throw_err("Artikel Tidak Ditemukan", statusCode['404_not_found'])
        }

        if(del_article.pic !== null) {
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