const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gamePilganSchema = new Schema({
    question : {
        type: String,
        required: true
    },
    question_pic : {
        type: String,
        default: null
    },
    choices : [
        { type: String,  required: true }
    ],
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Game-Pilgan', gamePilganSchema)