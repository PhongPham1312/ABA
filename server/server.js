import express from 'express'
require("dotenv").config()
import cors from 'cors'

import initRouters from "./src/routes"
import connectDB from './src/config/connectDB'

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

// đọc dữ liệu api
app.use(express.json())
app.use(express.urlencoded({extended: true}))

initRouters(app) // khoi tao cac route
connectDB() // ket noi database
const port = process.env.PORT || 8888

const listiner = app.listen(port, () => {
    console.log(`Server is running on the port ${listiner.address().port}`)
})