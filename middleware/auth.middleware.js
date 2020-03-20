const jwt = require('jsonwebtoken');
const config = require('config');

module.exports  = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try {

        let token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.json({
                status: 401,
                message: "No token. Authorization denied"
            })
        }

        jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
            if(err) {
                return res.json({
                    status: 400,
                    message: "Invalid token"
                })
            } else {
                req.user = decoded;
                next();
            }
        })

    } catch (e) {
        res.json({
            status: 401,
            message: "Token is not valid"
        })
    }
}