const jwt = require('jsonwebtoken')

module.exports = {
    generate(data, cb){
        // console.log('jwt data', data)
        // return jwt.sign(data, process.env.SECRET)
        jwt.sign(data, 'SECRET', (err, token) => {
            if (!err) {
                console.log('jwt token', token)
                // return token
                cb(token)
            } else {
                console.log(err)
            }
        })
    },
    verify: (req, res, next) => {
        if (!req.headers.token) return res.status(401).send({ message: 'not authorize'});
        
        try {
            let decode = jwt.verify(req.headers.token, 'SECRET');
            req.body.id = decode.id;
            next();
        } catch (error) {
            return res.status(403).send({ message: 'not authorize'})
        }
    }
}