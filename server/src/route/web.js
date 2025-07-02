import express from 'express'
import userController from '../controllers/userController'
let router = express.Router()

let initwebRoutes = (app) => {

    // user
    router.get('/get-user-by-id', userController.getUser)
    router.get('/get-user-all', userController.getAllUsers)
    router.post('/create-user', userController.createUser)
    router.put('/update-user', userController.updateUser)
    router.delete('/delete-user', userController.deleteUser)
    router.get('/search-user', userController.searchUsers)
    router.put('/update-passwod-user', userController.updatePassword)


    return app.use('/', router)
}

module.exports = initwebRoutes