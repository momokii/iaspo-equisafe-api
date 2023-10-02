const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    thumbnail_link: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Video', videoSchema)