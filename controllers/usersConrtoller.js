const User = require('../models/user')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const bcrypt = require('bcrypt')
const { validationResult }  = require('express-validator')


// * -------------------------------- routing

function throw_err(msg, code) {
    const err = new Error(msg)
    err.statusCode = code
    throw err
}



exports.check_username = async (req, res, next) => {
    try{
        let username_avail = true
        const username_check = req.query.username
        const response = {
            errors: false,
            message: 'Info ketersediaan username',
            data: {
                username: username_check,
                availability: username_avail
            }
        }

        if(!username_check){
            response.data.username = null
            response.data.availability = null
            return res.status(statusCode['200_ok']).json(response)
        }

        const user_check = await User.findOne({
            username : username_check
        })

        if(user_check && req.username !== user_check.username){
            response.data.availability = false
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.get_info_self = async(req, res, next) => {
    try {
        const user = await User.findById(req.userId)
            .select("username name role last_video emergency_contact")
            .populate({
                path: "last_video",
                select: "title description link thumbnail_link"
            })
            .lean()

        if(!user){
            throw_err("Token Error, User tidak ditemukan", statusCode['404_not_found'])
        }

        if(user.last_video === null){
            user.last_video = {
                _id: null,
                title: null,
                description: null,
                link: null
            }
        }

        user.emergency_contact.no_telp = user.emergency_contact.no_telp.toString()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message : "Info user detail",
            data: user
        })

    } catch (e) {
        if(e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.get_info = async (req, res, next) => {
    try{
        let user = await User.findOne({
            username: req.params.username
        })
            .select('username name role last_video emergency_contact')
            .populate({
                path: 'last_video',
                select: 'title description link thumbnail_link'
            })
            .lean()

        if(!user){
            throw_err("User tidak ditemukan", statusCode['404_not_found'])
        }

        if(user.last_video === null){
            user.last_video = {
                _id: null,
                title: null,
                description: null,
                link: null
            }
        }

        user.emergency_contact.no_telp = user.emergency_contact.no_telp.toString()

        if(user._id.toString() !== req.userId && req.role !== 'admin'){
            throw_err('Akun tidak punya akses', statusCode['401_unauthorized'])
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Info User',
            data: user
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.change_password = async (req, res, next) => {
    try{
        const val_err = validationResult(req)
        if(!val_err.isEmpty()){
            const msg = val_err.array()[0].msg
            throw_err(msg, statusCode['400_bad_request'])
        }

        const user = await User.findById(req.userId)
        if(!user){
            throw_err('Token tidak valid/ User tidak punya akses', statusCode['401_unauthorized'])
        }

        const compare_oldpass = await bcrypt.compare(req.body.password, user.password)
        if(!compare_oldpass){
            throw_err("Password lama tidak sesuai dengan password akun", statusCode['400_bad_request'])
        }

        const new_pass = await bcrypt.hash(req.body.new_password, 16)
        user.password = new_pass

        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "User sukses ganti password"
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.change_emegergency = async (req, res, next) => {
    try{
        const new_name = req.body.name
        let new_phone = req.body.telp

        if(new_phone.startsWith("0")){
            new_phone = new_phone.slice(1)
        }

        const user = await User.findById(req.userId)
        if(!user){
            throw_err('Token tidak valid/ User tidak punya akses', statusCode['401_unauthorized'])
        }

        user.emergency_contact.name = new_name
        user.emergency_contact.no_telp = new_phone

        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Berhasil ubah kontak emergensi'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
    }
}




exports.change_info = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user){
            throw_err('Token tidak valid/ User tidak punya akses', statusCode['401_unauthorized'])
        }

        const name = req.body.name
        const username = req.body.username

        user.username = username
        user.name = name

        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'User sukses ubah info akun'
        })
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}