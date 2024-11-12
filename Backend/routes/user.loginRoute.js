const express = require('express')
const loginUser = require('../controllers/user.loginController')
const loginRouter = express.Router()
loginRouter.post('/', loginUser)
module.exports = loginRouter