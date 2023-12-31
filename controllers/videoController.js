require('dotenv')
const statusCode = require('../utils/http-response').httpStatus_keyValue
const Video = require('../models/video')
const User = require('../models/user')
const fileController = require('../controllers/fileController')
const mongoose = require('mongoose')


// * -------------------------------- FUNCTION

function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}


// * -------------------------------- CONTROLLER

exports.getAllVideo = async (req, res, next) => {
    try{

        const total_data = await Video.find().countDocuments()
        // * karena pake search -> maka tidak gunakan skip/limit pada proses query dan dilakukan secara manual dengan urutan | query -> filter search -> pagination
        let all_video = await Video.find()
            .select('title description link thumbnail_link')
            .lean()
        const response = {
            errors: false,
            message: 'Get Video Data',
            data: {
                total_data: total_data
            }
        }

        // * pagination
        const current_page = parseInt(req.query.page) || 1
        const per_page = parseInt(req.query.per_page) || 5
        const start_data = (current_page - 1) * per_page


        // * search feature
        if(req.query.search){
            const q = req.query.search.toString().trim().toLowerCase()
            if(q){
                all_video = all_video.filter(doc => {
                    return doc.title.toLowerCase().includes(q)
                })
            }
        }

        all_video = all_video.slice(start_data, start_data + per_page)

        // * check video data for user favorite data
        const user = await User.findById(req.userId)
        if(!user){
            throw_err("User not found/ Token not valid", statusCode['401_unauthorized'])
        }
        for(let video of all_video){
            if(user.favorites_video.includes(video._id)){
                video.is_favorite = true
            } else {
                video.is_favorite = false
            }
        }

        response.data = {
            ...response.data,
            current_page: current_page,
            per_page: per_page,
            videos: all_video
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.getOneVideo = async (req, res, next) => {
    try{
        const id_video = req.params.id_video
        let video = await Video.findById(id_video)
            .select("title description link thumbnail_link")
            .lean()
        if(!video){
            throw_err("Data Video Not Found", statusCode['404_not_found'])
        }

        const user = await User.findById(req.userId)
        if(!user){
            throw_err("User not found/ Token not valid", statusCode['401_unauthorized'])
        }

        video.is_favorite = false
        if(user.favorites_video.includes(id_video)){
            video.is_favorite = true
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get Video Data',
            data: video
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.post_video_manual = async (req, res, next) => {
    try {
        const title = (req.body.title || "").trim()
        const description = (req.body.description || "").trim()
        const from_youtube = req.body.from_youtube || false
        const youtube_link = (req.body.youtube_link || "").trim()
        const gcp_filename = (req.body.gcp_filename || "").trim()
        if(!title || !description){
            throw_err("Your description/ title is empty, process failed, please check your input again", statusCode['400_bad_request'])
        }
        let link

        if(from_youtube === true){
            if(!youtube_link){
                throw_err("Youtube link not inputed, process failed, please check your input again", statusCode['400_bad_request'])
            }

            link = youtube_link

            // * check if the name already exist (video) in database  
            const check_video = await Video.findOne({
                link: link
            })
            if (check_video){
                throw_err("Video with same link already exist, please check your input name again", statusCode['400_bad_request'])
            }            

        } else {
            if(!gcp_filename){
                throw_err("GCP filename not inputed, process failed, please check your input again", statusCode['400_bad_request'])
            }

            // * filename must included extension
            const video_extension = ['mp4', 'webm', 'ogg', 'mkv', 'mov']
            const filename = gcp_filename.split('.')
            if(filename.length < 2){
                throw_err("Filename must included extension, please check your input again", statusCode['400_bad_request'])
            }
            const file_ext = filename[filename.length - 1]
            if(!video_extension.includes(file_ext)){
                throw_err("File extension allowed only mp4, webm, ogg, mkv, mov, please check your input name again", statusCode['400_bad_request'])
            }

            link = "https://storage.googleapis.com/equisafe-prod/videos/" + gcp_filename

            // * check if the name already exist (video) in database
            const check_video = await Video.findOne({
                link: link
            })
            if (check_video){
                throw_err("Video with same link already exist, please check your input name again", statusCode['400_bad_request'])
            }

        }

        // * check  if the name already exist (video) in database
        const check_name = await Video.findOne({
            title: title
        })
        if(check_name){
            throw_err("Video with same title already exist, please check your input name again", statusCode['400_bad_request'])
        }

        const new_video = new Video({
            title: title,
            description: description,
            link: link,
            thumbnail_link: process.env.DEFAULT_PIC_VIDEO
        })

        await new_video.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success add new video data with manual input"
        })

    } catch(e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.post_video = async (req, res, next) => {
    try{
        if(!req.file){
            throw_err("Video not inputed, process failed", statusCode['400_bad_request'])
        }

        const title = req.body.title
        const description = req.body.description
        req.type = 'vid'

        const video_extension = ['mp4', 'webm', 'ogg', 'mkv', 'mov']
        const filename = req.file.originalname.split('.')
        const file_ext = filename[filename.length - 1]
        if(!video_extension.includes(file_ext)){
            throw_err("File extension allowed only mp4, webm, ogg, mkv, mov", statusCode['400_bad_request'])
        }

        const public_url = await fileController.uploadFile(req)

        const new_video = new Video({
            title: title,
            description: description,
            link: public_url,
            thumbnail_link: process.env.DEFAULT_PIC_VIDEO
        })

        await new_video.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success add new video'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.post_recent_video = async (req, res, next) => {
    try{
        const id_video = req.params.id_video
        const video = await Video.findById(id_video)
        if(!video){
            throw_err("Data Video Not Found", statusCode['404_not_found'])
        }

        const user = await User.findById(req.userId)

        user.last_video = id_video
        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Update user recent video played"
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.edit_video = async (req, res, next) => {
    try{
        const id_video = req.params.id_video
        const video = await Video.findById(id_video)
        if(!video){
            throw_err(throw_err("Data Video Not Found", statusCode['404_not_found']))
        }

        const new_title = req.body.title
        const new_description = req.body.description
        let new_video

        // * jika data video di ganti
        if(req.file){
            req.type = 'vid'
            req.file_url = video.link

            const video_extension = ['mp4', 'webm', 'ogg', 'mkv', 'mov']
            const filename = req.file.originalname.split('.')
            const file_ext = filename[filename.length - 1]
            if(!video_extension.includes(file_ext)){
                throw_err("File extension allowed only mp4, webm, ogg, mkv, mov", statusCode['400_bad_request'])
            }

            const del_video = await fileController.deleteItem(req)

            if(!del_video){
                throw_err("Upload new video failed", statusCode['400_bad_request'])
            }

            new_video = await fileController.uploadFile(req)
        }

        video.title = new_title
        video.description = new_description
        if(new_video){
            video.link = new_video
        }

        await video.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success edit video data'
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.edit_video_thumbnail = async (req, res, next) => {
    try{
        const id_video = req.body.id_video 
        const video = await Video.findById(id_video)
        if(!video){
            throw_err("Data Video Not Found", statusCode['404_not_found'])
        }
        req.type = 'vid'
        req.file_url = video.thumbnail_link

        if(req.body.delete_thumbnail === 'true'){
            if(video.thumbnail_link !== process.env.DEFAULT_PIC_VIDEO){
                req.file_url = video.thumbnail_link
                const del_thumbnail = await fileController.deleteItem(req)
                if(!del_thumbnail){
                    throw_err("Delete thumbnail failed", statusCode['400_bad_request'])
                }
                video.thumbnail_link = process.env.DEFAULT_PIC_VIDEO
                await video.save()
            }

            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Success edit video thumbnail data'
            })
        }

        if(!req.file){
            throw_err("File not inputed, process failed", statusCode['400_bad_request'])
        }

        const ext_allowed = ['jpg', 'jpeg', 'png', 'gif']
        const file_name = req.file.originalname.split('.')
        const file_ext = file_name[file_name.length - 1]
        if(!ext_allowed.includes(file_ext)){
            throw_err("File extension allowed only jpg, jpeg, png, gif", statusCode['400_bad_request'])
        }

        if(video.thumbnail_link !== process.env.DEFAULT_PIC_VIDEO){
            const del_thumbnail = await fileController.deleteItem(req)
            if(!del_thumbnail){
                throw_err("Delete thumbnail failed", statusCode['400_bad_request'])
            }
        }

        req.thumbnail = true
        const new_thumbnail = await fileController.uploadFile(req)
        video.thumbnail_link = new_thumbnail
        await video.save()
        
        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success edit video thumbnail data'
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.delete_video = async (req, res, next) => {

    const session  = await mongoose.startSession()
    session.startTransaction()

    try{
        const id_video = req.params.id_video
        const video = await Video.findById(id_video)
        if(!video){
            throw_err("Data Video Not Found", statusCode['404_not_found'])
        }

        req.type = 'videos'
        
        // * pastikan juga untuk delete thumbnail jika ada
        if(video.thumbnail_link !== process.env.DEFAULT_PIC_VIDEO){
            req.file_url = video.thumbnail_link
            await fileController.deleteItem(req)
        }

        // * delete video data from database
        await Video.findByIdAndDelete(id_video)

        req.file_url = video.link //* path video akan dihapus
        // * delete video from cloud storage
        await fileController.deleteItem(req)

        await session.commitTransaction()
        session.endSession()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success delete video data'
        })

    } catch (e) {
        await session.abortTransaction()
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}