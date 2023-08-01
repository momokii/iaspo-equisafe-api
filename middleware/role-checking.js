const statusCode = require('../utils/http-response').httpStatus_keyValue

function throw_err(role){
    const err = new Error("Not Authorized, hanya bisa diakses oleh " + role)
    err.statusCode = statusCode['401_unauthorized']
    throw err
}


exports.is_user = async (req, res, next) => {
    try{
        if(req.role !== 'user'){
            throw_err("User")
        }

        next()
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['401_unauthorized']
        }
        next(e)
    }
}



exports.is_admin = async (req, res, next) => {
    try{
        if(req.role !== 'admin'){
            throw_err('Admin')
        }

        next()
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['401_unauthorized']
        }
        next(e)
    }
}