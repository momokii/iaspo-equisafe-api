const statusCode = require('../utils/http-response').httpStatus_keyValue
const MapsDisaster = require('../models/maps-disaster')


// * -------------------------------- FUNCTION

function throw_err(msg, code){
    const err = new Error(msg)
    err.statusCode = code
    throw err
}


// * -------------------------------- CONTROLLER

exports.getAllMapsData = async(req, res, next) => {
    try{
        const page = req.query.page || 1 
        const per_page = req.query.per_page || 5
        const start_data = (page - 1) * per_page
        const search = req.query.search || ""

        const total_data = await MapsDisaster.countDocuments({
            nama: {$regex: new RegExp(search.trim(), "i")}
        })

        const all_data = await MapsDisaster.find({
            nama: {$regex: new RegExp(search.trim(), "i")}
        })
            .select('long lat nama data')
            .skip(start_data)
            .limit(per_page)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get all maps data",
            data: {
                total_data: total_data,
                current_page: page,
                per_page: per_page,
                maps: all_data
            }
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getOneData = async(req, res, next) => {
    try{
        let map_data = await MapsDisaster.findById(req.params.id_maps)
            .select("long lat nama data")
        
        if(!map_data){
            throw_err("Data maps not found", statusCode['404_not_found'])
        }

        if(req.query.data_disaster_only === "true"){
            map_data = map_data.data
            if(req.query.id_disaster){
                map_data = map_data.find(item => item._id.toString() === req.query.id_disaster.toString())
                if(!map_data){
                    map_data = null
                }
            }
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get map data",
            data: map_data
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postNewMapsData = async(req, res, next) => {
    try{
        const {nama, long, lat} = req.body
        if(!nama){
            throw_err("Data input not valid", statusCode['400_bad_request'])
        }

        const checkMapsDataName = await MapsDisaster.findOne({
            
            nama: {$regex: new RegExp(`^${nama.trim()}$`, "i")}, // hanya kembalikan nama sesuai "joko" maka kembalikan  "joko", "jOkO" dan TIDAK akan kembalikan misal "joko Utomo" "saya jOKO"
            //nama: {$regex: new RegExp(nama.trim(), "i")}, 
            // nama : {$regex : nama.trim(), $options : "i"} // * alternatif
        })
        if(checkMapsDataName){
            throw_err("The name of the data is already exist, please check again your input", statusCode['400_bad_request'])
        }

        const checkMapsLongLat = await MapsDisaster.findOne({
            long: long, 
            lat: lat
        })
        if(checkMapsLongLat){
            throw_err("There is data have same long lat, please check your input again", statusCode['400_bad_request'])
        }

        const newMapsData = new MapsDisaster({
            nama: nama.trim(),
            long: long,
            lat: lat
        })

        await newMapsData.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success add new maps location data"
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editDisasterMapData = async(req, res, next) => {
    try{
        const {id_maps, nama, total, add_data, del_data, edit_data, edit_total_only} = req.body 
        const mapsData = await MapsDisaster.findById(id_maps)
        if(!mapsData){
            throw_err("Data maps not found", statusCode['404_not_found'])
        }

        // * add data disaster
        if(add_data){
            // * check if disaster name is already exist in maps data 
            const checkDisasterName = mapsData.data.find(item => item.nama.trim().toLocaleLowerCase() === nama.trim().toLocaleLowerCase())
            if(checkDisasterName){
                throw_err("Disaster name is already exist in maps data", statusCode['400_bad_request'])
            }

            if(total <= 0){
                throw_err("Total must be greater than 0", statusCode['400_bad_request'])
            }

            // * add new disaster name and total
            mapsData.data.push({
                nama: nama.trim(),
                total: total
            })

        } else if(del_data){ // * delete data disaster
            // * untuk sekarang dapat dihapus dengan berdasarkan id -> karena tiap data akan punya id masing masing
            const id_del_data = req.body.id_disaster.toString()

            const check_data = mapsData.data.find(item => item._id.toString() === id_del_data)
            if(!check_data){
                throw_err("Data disaster not found", statusCode['404_not_found'])
            }
            
            mapsData.data = mapsData.data.filter(item => {
                if(item._id.toString() !== id_del_data){
                    return item
                }
            })

            
        } else if(edit_data){ // * edit data disaster
            const id_del_data = req.body.id_disaster.toString()

            const check_data_index = mapsData.data.findIndex(item => item._id.toString() === id_del_data)
            if(check_data_index === -1){
                throw_err("Data disaster not found", statusCode['404_not_found'])
            }

            if(total <= 0){
                throw_err("Total must be greater than 0", statusCode['400_bad_request'])
            }

            if(!edit_total_only){
                const checkDisasterName = mapsData.data.find(item => item.nama.trim().toLocaleLowerCase() === nama.trim().toLocaleLowerCase())
                if(checkDisasterName && checkDisasterName._id.toString() !== id_del_data){
                    throw_err("Disaster name is already exist in maps data", statusCode['400_bad_request'])
                }
                mapsData.data[check_data_index].nama = nama.trim()
            }
            
            mapsData.data[check_data_index].total = total

        }
        
        await mapsData.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success edit maps data disasters"
        })


    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editMapsData = async(req, res, next) => {
    try{
        const {id_maps, long, lat, nama} = req.body
        const mapsData = await MapsDisaster.findById(id_maps)
        if(!mapsData){
            throw_err("Data maps not found", statusCode['404_not_found'])
        }

        const checkMapsDataName = await MapsDisaster.findOne({
            nama: {$regex: new RegExp(`^${nama.trim()}$`, "i")}
        })
        if(checkMapsDataName && checkMapsDataName._id.toString() !== id_maps.toString()){
            throw_err("The name of the data is already exist, please check again your input", statusCode['400_bad_request'])
        }

        const checkMapsLongLat = await MapsDisaster.findOne({
            long: long, 
            lat: lat
        })
        if(checkMapsLongLat){
            throw_err("There is data have same long lat, please check your input again", statusCode['400_bad_request'])
        }

        mapsData.long = long
        mapsData.lat = lat
        mapsData.nama = nama.trim()

        await mapsData.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success edit maps data"
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteMapsData = async(req, res, next) => {
    try{
        const id_maps = req.body.id_maps
        const mapsData = await MapsDisaster.findById(id_maps)
        if(!mapsData){
            throw_err("Data maps not found", statusCode['404_not_found'])
        }

        await MapsDisaster.findByIdAndDelete(id_maps)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success delete maps data"
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}


