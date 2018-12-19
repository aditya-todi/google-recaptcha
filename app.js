const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./config/db')

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'session-key',
    resave: false,
    saveUninitialized: true,
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    )
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH")
        return res.json({})
    }
    next()
})

require('./config/passport/passport')(app)

routes(app)

db.once('open', () => {
    console.log('db connected successfully')
})

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('server running on PORT: ', port)
})