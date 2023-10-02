// * ----------------- ----------------- dependencies
require('dotenv').config()
const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')


// * konstanta
const PORT = process.env.PORT
const MONGO = process.env.MONGO
const MONGO_DEV = MONGO + 'dev-iaspo'
const MONGO_PROD = MONGO + 'prod-iaspo'

// * routing
const authRouting = require('./routes/authRoutes')
const articleRouting = require('./routes/articleRoutes')
const videoRouting = require('./routes/videoRoutes')
const userRouting = require('./routes/userRoutes')
const gameJawabanRouting = require('./routes/game-jawabanRoutes')
const gamePilganRouting = require('./routes/game-pilganRoutes')
const mapsDisasterRouting = require('./routes/mapsDisasterRoutes')

// * ----------------- ----------------- app

// * -- swagger config
const swaggerOptions = {
    definition : {
        openapi : '3.0.0',
        info:{
            title: 'IASPO - EquiSafe API',
            description: 'The Equisafe API is designed to accommodate the requirements of Equisafe application, which is expected to operate on both mobile platforms for general users and web platforms to cater to the needs of administrators using a web-based CMS. This API provides the necessary endpoints and functionality to seamlessly support the dual nature of the application, enabling it to serve a wide range of user roles and functions efficiently.',
            contact: {
                name: 'nama',
                url: 'kosong',
                email: 'aa'
            }
        },
        servers: [
            {
                url: 'http://localhost:' + PORT,
                description: 'Local Development Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./swagger-jsdoc/*.js']
}
const swaggerSpecs = swaggerJSDoc(swaggerOptions)


// * -- app config
const app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended : false}))
app.use(cors())
app.use( helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    hsts: false,
    noCache: true,
    referrerPolicy: { policy: 'no-referrer' }
}) );



// * -- app config routing
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use('/', authRouting)
app.use('/users', userRouting)
app.use('/articles', articleRouting)
app.use('/maps', mapsDisasterRouting)
app.use('/videos', videoRouting)
app.use('/games/jawaban', gameJawabanRouting)
app.use('/games/pilgan', gamePilganRouting)


// * global error handling
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        errors: true,
        message: message,
    })
})


// * -- app connect
async function start_server(){
    try{
        await mongoose.connect(MONGO_DEV)
        app.listen(PORT)
        console.log('connected to http://localhost:' + PORT)
    } catch (e) {
        console.log(e)
    }
}
start_server()