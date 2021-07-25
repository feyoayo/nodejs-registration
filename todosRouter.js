const Router = require('express')
const router = new Router;
const AuthMiddleware = require('./middlewares/authMiddleware')
const rolesMiddleware = require('./middlewares/roleMiddleware')
const controller = require('./todosController')
const {check} = require('express-validator')

router.get('/todos',AuthMiddleware, controller.getAllTodos )
router.get('/user-todos/:id',AuthMiddleware, controller.getTodosForUser)
router.post('/todos', check('todoBody', "Body shouldn't be empty").isEmpty()  , controller.createTodo)

module.exports = router
