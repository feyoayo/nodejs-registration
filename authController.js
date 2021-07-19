const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')



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
            const userRole = Role.findOne({value: 'USER'})
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
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})

        }
    }

    async getUsers(req, res) {
        try {
            res.json('server work')
        } catch (e) {
            console.log(e)
        }
    }
};

module
    .exports = new authController()
