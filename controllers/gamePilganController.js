const statusCode = require('../utils/http-response').httpStatus_keyValue
const GamePilgan = require('../models/game-pilgan')
const _ = require('lodash')


// * -------------------------------- routing

function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}





exports.play_game = async (req, res, next) => {
    try{
        const total_data = await GamePilgan.find().countDocuments()
        const total_question = parseInt(req.query.number_question) || 5

        let questions = await GamePilgan.aggregate([
            { $sample: { size :  total_question} }
        ])

        questions = questions.map(doc => {
            return {
                question: doc.question,
                question_pic: doc.question_pic,
                choices: _.shuffle(doc.choices),
                answer: doc.answer
            }
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Play Game - Pilihan Ganda',
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

        const question = await GamePilgan.findById(id_question)
            .select('question question_pic choices answer')
        if(!question){
            throw_err('Data tidak ditemukan', statusCode['404_not_found'])
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Data Pertanyaan dan Jawaban',
            data: question
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
        const current_page = parseInt(req.query.page) || 1
        const per_page = parseInt(req.query.per_page) || 10
        const start_data = (current_page - 1) * per_page
        const total_data = await GamePilgan.find().countDocuments()

        const all_questions = await GamePilgan.find()
            .select('question question_pic choices answer')
            .skip(start_data)
            .limit(per_page)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Data Pertanyaan dan Jawaban',
            data: {
                total_data: total_data,
                current_page: current_page,
                per_page: per_page,
                questions: all_questions
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
            if(doc.user_answer.toString() === doc.answer.toString()){
                correct = true
                total_points += 1
            }
            return {
                ...doc,
                correct: correct
            }
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Result Game - Pilihan Ganda',
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
        const question_pic = null

        //* -> pertimbangan tidak gunakan lowercase otomatis di bawah karena mungkin bisa saja jawaban bersifat singkatan sehingga memang harus huruf besar semua -> BMKG
        const pilihan_jawaban = req.body.choices.map(doc => {
            return doc.toString()//.toLowerCase()
        })
        const answer = req.body.answer.toString()//.toLowerCase()

        //* -> lakukan pengecekan bahwa "jawaban" pasti ada dalam pilihan untuk dipastikan saja agar dapat berjalan sesuai diharapkan
        if(!pilihan_jawaban.includes(answer)){
            throw_err("Jawaban tidak tersedia dalam pilihan, error", statusCode['400_bad_request'])
        }

        const new_question = new GamePilgan({
            question: question,
            question_pic: question_pic,
            choices: pilihan_jawaban,
            answer: answer
        })

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
        const question_edit = await GamePilgan.findById(req.params.id_question)
        if(!question_edit){
            throw_err("Data tidak ditemukan, edit gagal", statusCode['404_not_found'])
        }

        // * pertama ini pake versi non gambar dahulu -> diubah nanti jadi ke multipart-form
        const new_question = req.body.question
        const new_choices = req.body.choices.map(doc => {
            return doc.toString()//.toLowerCase()
        })
        const new_answer = req.body.answer.toString()//.toLowerCase()

        question_edit.question = new_question
        question_edit.choices = new_choices
        question_edit.answer = new_answer

        if(!question_edit.choices.includes(question_edit.answer)){
            throw_err("Jawaban tidak tersedia dalam pilihan, edit error", statusCode['400_bad_request'])
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
        const question = await GamePilgan.findById(req.params.id_question)
        if(!question){
            throw_err('Data tidak ditemukan, delete gagal', statusCode['404_not_found'])
        }

        await GamePilgan.findByIdAndDelete(req.params.id_question)

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