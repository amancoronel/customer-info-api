const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

module.exports = (app) => {
    app.use(helmet())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))   
    app.use(cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })) // SETTINGS FOR CORS
    app.use(cookieParser())
    app.use(
        session({
            key: "userId",
            secret: 'subscribe',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000,
                expires: +process.env.SESSION_EXPIRATION // 1 day
            }
        })
    )

    console.log('process.env.COOKIE_SECRET', process.env.COOKIE_SECRET)
}