const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const { secret } = require('./config')

const generateAccessToket = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}


class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'Something goes wrong during registration', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: 'User already exist'})
            }
            const hashPwd = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User ({username, password: hashPwd, roles: [userRole.value] })
            await user.save()
            return res.json({message: 'Registration successful'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message: `User ${username} not found`})
            }
            const isValid = bcrypt.compareSync(password, user.password)
            if(!isValid){
                return res.status(400).json({message: `Invalid password`})
            }

            const token = generateAccessToket(user._id, user.roles)
            return res.json({Status: 'ok', token, roles: user.roles})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})

        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
    async deleteUser(req, res)
    {
        const id = req.params.id
        try{
            await User.findByIdAndDelete(id)
            const deletedUser = await User.findById(id)
            if(!deletedUser){
                return res.json({message: 'User deleted'})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: e})
        }
    }
}

module
    .exports = new authController()
