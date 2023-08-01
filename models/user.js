const mongoose = require('mongoose')
const {stringify} = require("nodemon/lib/utils");
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:  {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    last_video: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Video'
    },
    emergency_contact: {
        name: {
            type: String,
            required: true
        },
        no_telp: {
            type: Number,
            required: true
        }
    },
    token: {
        auth: {
            type: String,
            default: null
        }
    }
},
    {
        timestamps: true
    })


module.exports = mongoose.model('User', userSchema)