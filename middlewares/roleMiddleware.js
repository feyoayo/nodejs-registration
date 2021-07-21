const {secret} = require('../config')
const jwt = require('jsonwebtoken')
module.exports = function (roles){
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
        try{
            const token = req.headers.authorization
            if(!token){
                return res.status(403).json({message: "Invalid token"})
            }
            const {roles : userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true
                }
            })
            if(!hasRole){
                return res.status(403).json({message: "User haven't access"})
            }
            next()

        } catch (e) {
            return res.status(403).json({message: "User haven't autorizated  "})
        }
    }
}
