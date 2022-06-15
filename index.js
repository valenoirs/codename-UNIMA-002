const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const flash = require('connect-flash')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}))

app.use((req, res, next) => {
    if(req.session.userId && req.session.userName && req.session.userEmail){
        res.locals.userId = req.session.userId
        res.locals.userName = req.session.userName
        res.locals.userEmail = req.session.userEmail
    }
    next()
})

app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

// Templating Engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`Successfuly connected to local mongodb`))
.catch((error) => console.error(error))

// HTTP Routes
app.use('/', require('./routes/view'))

app.use('/user', require('./routes/user'))
app.use('/barang', require('./routes/barang'))
app.use('/peminjam', require('./routes/peminjam'))

// Ping Server!
app.get('/ping', (req, res, next) => {
    res.send('pong!')
})

app.use('/', (req, res) => {
    res.status(404).send('<h1>404 : Page not found.</h1>')
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})