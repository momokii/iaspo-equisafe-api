const GameTebakan = require('../models/game-tebakan')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const _ = require('lodash')
const fileController = require('../controllers/fileController')

// * -------------------------------- routing

function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}





exports.play_game = async (req, res, next) => {
    try{
        const total_data = await GameTebakan.find().countDocuments()
        const total_question = parseInt(req.query.number_question) || 5

        let questions = await GameTebakan.aggregate([
            { $sample: { size : total_question }}
        ])

        questions = questions.map(doc => {
            return {
                question: doc.question,
                question_pic: doc.question_pic,
                answer: doc.answer
            }
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Play Game - Jawaban Singkat',
            data: {
                total_data: total_data,
                total_question: total_question,
                questions: questions
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.get_one_question = async (req, res, next) => {
    try{
        const id_question = req.params.id_question
        if(!id_question){
            throw_err('Data tidak ditemukan', statusCode['404_not_found'])
        }

        const get_question = await GameTebakan.findById(id_question)
            .select('question question_pic answer')
        if(!get_question){
            throw_err('Data tidak ditemukan', statusCode['404_not_found'])
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Data Pertanyaan dan Jawaban',
            data: get_question
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.get_all_question = async (req, res, next) => {
    try{

        const total_data = await GameTebakan.find().countDocuments()
        const current_page = parseInt(req.query.page) || 1
        const per_page = parseInt(req.query.per_page) || 10
        const start_data = (current_page - 1 ) * per_page

        let all_question = await GameTebakan.find()
            .select('question question_pic answer')
            .skip(start_data)
            .limit(per_page)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Data Pertanyaan dan Jawaban',
            data: {
                total_data: total_data,
                current_page: current_page,
                per_page: per_page,
                questions: all_question
            }
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.play_game_post = async (req, res, next) => {
    try{
        let user_results = req.body.question_lists
        let total_points = 0
        const total_question = user_results.length

        user_results = user_results.map(doc => {
            let correct = false
            if(doc.answer.toString() === doc.user_answer.toString()){
                correct = true
                total_points += 1
            }
            // doc.answer = _.startCase(doc.answer)
            return {
                ...doc,
                correct: correct
            }
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Result Game - Jawaban Singkat',
            data:{
                total_question: total_question,
                total_correct: total_points,
                questions: user_results
            }
        })
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.post_question = async (req, res, next) => {
    try{
        // * pertama ini pake versi non gambar dahulu -> diubah nanti jadi ke multipart-form
        const question = req.body.question
        const answer = req.body.answer//.toLowerCase()
        let question_pic = null

        const new_question = new GameTebakan({
            question: question,
            question_pic: question_pic,
            answer: answer
        })

        // * proses file disini karena harus buat objek pertanyaan terkait di atas untuk bisa dapatkan id-nya
        // * jika gunakan gambar
        if(req.file){
            req.type = 'games'
            req.game = 'jawaban'

            question_pic = await fileController.uploadFile(req)
            new_question.question_pic = question_pic
        }

        await new_question.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Berhasil tambah pertanyaan baru'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.edit_question = async (req, res, next) => {
    try{
        let question_edit = await GameTebakan.findById(req.params.id_question)
        if(!question_edit){
            throw_err("Data tidak ditemukan, edit gagal", statusCode['404_not_found'])
        }

        req.type = 'games'
        req.game = 'jawaban'
        req.file_url = question_edit.question_pic

        // * query ketika ingin hapus data gambar jadi null
        if(req.query.del_pic === 'true' && question_edit.question_pic){
            const del_pic = await fileController.deleteItem(req)

            if(!del_pic){
                return throw_err("Proses edit pertanyaan gagal", statusCode['400_bad_request'])
            }

            question_edit.question_pic = null
        }
        // * -------------- -------------- -------------- --------------


        const new_question = req.body.question
        const new_answer = req.body.answer.toString()

        question_edit.question = new_question
        question_edit.answer = new_answer

        if(req.file && req.query.del_pic !== 'true'){
            if(question_edit.question_pic){
                const del_pic = await fileController.deleteItem(req)

                if(!del_pic){
                    return throw_err("Proses edit pertanyaan gagal", statusCode['400_bad_request'])
                }
            }

            let pic = await fileController.uploadFile(req)

            question_edit.question_pic = pic
        }

        await question_edit.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Sukses edit data pertanyaan'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.delete_question = async (req, res, next) => {
    try{
        const delete_question = await GameTebakan.findById(req.params.id_question)
        if(!delete_question){
            throw_err('Data tidak ditemukan, delete gagal', statusCode['404_not_found'])
        }

        if(delete_question.question_pic){
            req.type = 'games'
            req.game = 'jawaban'
            req.file_url = delete_question.question_pic

            await fileController.deleteItem(req)
        }

        await GameTebakan.findByIdAndDelete(req.params.id_question)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Sukses hapus data pertanyaan'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}