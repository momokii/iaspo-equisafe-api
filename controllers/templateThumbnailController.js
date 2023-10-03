const statusCode = require('../utils/http-response').httpStatus_keyValue
const TemplateSchema = require('../models/template-thumbnail')
const fileController = require('../controllers/fileController')

// * -------------------------------- FUNCTION

function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}

// * -------------------------------- CONTROLLER

/*
    * untuk sekarang hanya bisa ubah template dan tidak bisa untuk tambah/ hapus dan template akan ada untuk video dan article
*/

exports.getAllTemplate = async (req, res, next) => {
    try{
        const all_data = await TemplateSchema.find()


        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Template Data",
            data: all_data
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getOneData = async (req, res, next) => {
    try{
        const data = await TemplateSchema.findById(req.params.id_template)
        if(!data){
            throw_err("Data not found", statusCode['404_not_found'])
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Template Data",
            data: data
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.updateData = async (req, res, next) => {
    try{
        if(!req.file){
            throw_err("Data picture not included, failed to update", statusCode['400_bad_request'])
        }

        const template_edit = await TemplateSchema.findById(req.body.id_template)
        if(!template_edit){
            throw_err("Data not template found", statusCode['404_not_found'])
        }

        const ext_allowed = ['jpg', 'jpeg', 'png', 'gif']
        const file_name = req.file.originalname.split('.')
        const file_ext = file_name[file_name.length - 1]
        if(!ext_allowed.includes(file_ext)){
            throw_err("File extension allowed only jpg, jpeg, png, gif", statusCode['400_bad_request'])
        }

        req.type = 'template'
        req.file_url = template_edit.link
        req.template_type = template_edit.tipe
        if(!req.file_url){
            throw_err("Data not found", statusCode['404_not_found'])
        }
        
        const del_now_data = await fileController.deleteItem(req)
        if(!del_now_data){
            throw_err("Failed to change", statusCode['500_internal_server_error'])
        }

        const new_file_url = await fileController.uploadFile(req)
        if(!new_file_url){
            throw_err("Upload new file data failed", statusCode['500_internal_server_error'])
        }

        await template_edit.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success edit template data"
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}