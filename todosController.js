const Todo = require('./models/Todo')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

class TodosController {
    async getTodosForUser(req, res) {
        try {
            const id = req.params.id
            const user = await User.findById(id)
            if(!user){
                return res.status(401).json('Cannot find user with this Id')
            }
            console.log(user)

            const todos = await Todo.find({username: user.username})
            return res.json(todos)
        } catch (e) {
            res.status(400).json({message: 'Something goes wrong'})
        }
    }

    async createTodo(req, res) {
        try {
            const token = req.headers.authorization
            const {id} = jwt.verify(token, secret)
            const {todoBody, completed} = req.body
            const user = await User.findById(id)
            if(!user){
                res.status(400).json({message: 'Cannot find this user'})
            }
            const todo = await new Todo({todoBody, completed, username: user.username})
            const todos = user.todos
            await User.findByIdAndUpdate(id, {todos: [...todos, todo]})
            await todo.save()

            return res.json({Status: true, message: 'Todo created'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Something goes wrong'})
        }
    }
    async getAllTodos(req, res) {
        try {
            const todos = await Todo.find()
            return res.json(todos);
        } catch (e) {
            res.status(400)
        }
    }
}


module.exports = new TodosController()
