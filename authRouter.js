const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')


router.post('/registration', [
    check('username', "Username shouldn't be empry").notEmpty(),
    check('password', "Password length should be more that 4 symbols and less than 10 symbols").isLength({max: 10, min: 4})
]  , controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router
