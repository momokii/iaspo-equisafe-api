const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameJawabanSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    question_pic : {
        type: String,
        required: false,
        default: null
    },
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Game-Jawaban', gameJawabanSchema)