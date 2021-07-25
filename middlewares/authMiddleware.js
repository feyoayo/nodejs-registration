const jwt = require('jsonwebtoken')
const {secret} = require('../config')
module.exports = function (req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
        try{
            const token = req.headers.authorization
            if(!token){
                return res.status(403).json({message: "User haven't autorizated"})
            }
            const decodedData = jwt.verify(token, secret)
            req.user = decodedData
            next()

        } catch (e) {
            return res.status(403).json({message: "User haven't autorizated"})
        }
}
