const { registerController, loginController } = require('../controller/userControler')

const userRouter = require('express').Router()

//User registration
userRouter.post('/register', registerController)

//Login
userRouter.post('/login', loginController)

module.exports = userRouter