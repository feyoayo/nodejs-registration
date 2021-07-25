const {Schema, model} = require('mongoose')

const Todo = new Schema({
    todoBody: {type: String, unique: true, required: true},
    completed: {type: Boolean, default: 'false'},
    username: {type: String}
})

module.exports = model('Todo', Todo)
