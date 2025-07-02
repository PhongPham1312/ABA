import express from 'express'
import userController from '../controllers/userController'
let router = express.Router()

let initwebRoutes = (app) => {

    router.get('/', (req, res) => {
        return res.send("hello phong dep trai!");
    })

    return app.use('/', router)
}

module.exports = initwebRoutes