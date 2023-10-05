require('dotenv')
const { format } = require('util')
const { Storage } = require('@google-cloud/storage')

//const storage = new Storage({ keyFilename: './ie-dev-01.json' }) // * dev sa bucket account
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials:{
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
        client_x509_cert_url: process.env.CLIENT_CERT_URL
    }
})

const bucket = storage.bucket(process.env.BUCKET_PROD)

const crypto = require('crypto')


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
        } else if(folderName === 'template'){
            filepath = "templates/"

            filename = req.template_type +  '-default.png'
        } else {
            // * masuk sini berarti jika tipe -> video
            filepath = "videos/"

            if(req.thumbnail){
                filename = filename + '.png'
            } else{
                filename = filename + '.mp4'
            }
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
        } else if(req.type === 'template'){
            folderName = 'templates/'

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