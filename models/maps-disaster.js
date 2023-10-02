const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const mapsDisasterSchema = new Schema({
    long: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    data: [
        {
            nama: String,
            total: Number
        }
    ]
}, {
    timestamps: true
})


module.exports = mongoose.model('Maps-Disaster', mapsDisasterSchema)