const statusCode = require('../utils/http-response').httpStatus_keyValue
const User = require('../models/user')
const Video = require('../models/video')


// * -------------------------------- routing

function throw_err(msg, code) {
    const err = new Error(msg)
    err.statusCode = code 
    throw err
}





exports.AddUserFavorite = async (req, res, next) => {
    try {

        const id_video = req.body.id_video 
        const check_video = await Video.findById(id_video)
        if(!check_video) {
            throw_err("Video with id inputted not found, check your input", statusCode['404_not_found'])
        }

        const user = await User.findById(req.userId)
        if(!user) {
            throw_err("User not found/ Token not valid", statusCode['401_unauthorized'])
        }

        const isFavorites = user.favorites_video.includes(id_video)
        if(isFavorites) {
            
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: "Video already in user favorite list"
            })
        }

        user.favorites_video.push(id_video)
        user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success add new favorite data"
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.DeleteUserFavoriteData = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId)
        if(!user) {
            throw_err("User not found/ Token not valid", statusCode['401_unauthorized'])
        }
        
        // * check if user data already empty
        if(user.favorites_video.length === 0) {
            return res.status(statusCode['200_ok']).json({
                errors : false,
                message: "User favorite data is already empty"
            }) 
        }

        // * check if need to delete all favorite data
        if(req.body.delete_all) {

            user.favorites_video = []

        } else {

            const id_video = req.body.id_video
            const check_video = await Video.findById(id_video)
            if(!check_video) {
                throw_err("Video with id inputted not found, check your input", statusCode['404_not_found'])
            }

            if(user.favorites_video.includes(id_video)) {
                user.favorites_video = user.favorites_video.filter(id => {
                    return id.toString() !== id_video
                })
            } else {
                return res.status(statusCode['200_ok']).json({
                    errors: false,
                    message: "Video not found in user favorite list"
                })
            }
        }

        user.save() // * save user data

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success delete favrite data from user"
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}