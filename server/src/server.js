import express from 'express'
import bodyParser from 'body-parser'
import initwebRoutes from './route/web'
import connectDB from './config/connectDB'
require('dotenv').config()

let app = express();

// config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

initwebRoutes(app)

connectDB();

let port = process.env.PORT || 6969

app.listen(port , () => {
    console.log("Server running on the port : " + port)
})