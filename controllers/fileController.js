const { format } = require('util')
const { Storage } = require('@google-cloud/storage')

const storage = new Storage({ keyFilename: './ie-dev-01.json' })
const bucket = storage.bucket('prjct-ie-dev-01')

const crypto = require('crypto')
const {upload} = require("@google-cloud/storage/build/src/resumable-upload");


exports.uploadFile = async (req, res, next) => {
    try {

        // * lihat REQ type -> (img/vid) masuk mana untuk edit file
        const folderName = req.type
        let filepath
        // * beri nama file untuk diupload dengan crypto randomBytes -> namun pemberian ekstensi dipisahkan karena akan beda upload video dengan gambar
        let filename = crypto.randomBytes(4).toString('hex')

        // * ketika gambar -> game -> tentukan game mana dan pada id yang mana juga (ada tambahan lebih panjang daripada up video)
        if(folderName === 'games'){
            const game_type = req.game // * sekarang (pilgan/jawaban)
            filepath = "games/" + game_type + '/'

            filename = filename + '.png'
        } else if (folderName === 'article') {
            filepath = "articles/"

            filename = filename + '.png'
        } else {
            // * masuk sini berarti jika tipe -> video
            filepath = "videos/"

            filename = filename + '.mp4'
        }


        let uploadPath = filepath + filename

        // *? Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(uploadPath);

        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        blobStream.on("error", (err) => {
            throw err
        });

        let publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        blobStream.on("finish", async (data) => {
            publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
        });

        blobStream.end(req.file.buffer);

        return publicUrl

    } catch (e) {
        console.log(e)
        return false
    }
}





exports.deleteItem = async (req, res, next) => {
    try{
        let folderName
        let uploadPath
        let del_file =  req.file_url.split('/')
        const filename = del_file[del_file.length - 1]

        if(req.type === 'games'){
            folderName = 'games/'
            const game_type = req.game

            uploadPath = folderName + game_type + '/' + filename
        } else if(req.type === 'article') {
            folderName = 'articles/'

            uploadPath = folderName + filename
        } else {
            folderName = 'videos/'

            uploadPath = folderName + filename
        }

        await bucket.file(uploadPath).delete()

        return true

    } catch (e) {
        console.log(e)
        return false
    }
}