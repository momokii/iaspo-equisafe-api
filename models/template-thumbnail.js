const mongoose = require('mongoose')
const Schema = mongoose.Schema

const templateSchema = new Schema({
    tipe: { 
        // * tipe untuk template -> video/ article
        type: String, 
        required: true
    },
    link: {
        type: String,
        requirede: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Template", templateSchema)