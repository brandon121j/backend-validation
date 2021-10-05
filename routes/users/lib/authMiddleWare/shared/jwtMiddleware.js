const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
    try {
        console.log(req.headers.authorization)

        if (req.headers && req.headers.authorization) {
            
            let notDecoded = req.headers.authorization

            let slicedToken = notDecoded.slice(7)

            let decodedToken = jwt.verify(slicedToken, process.env.JWT_SECRET)

            res.json({ message: decodedToken })
        } else {
            throw ({ message: "You don't have permission"})
        }
        res.json({ message: "SUCCESS", token: decodedToken })
    } catch(e) {
        res
            .status(500)
            .json({ message: "ERROR", error: e.message })
    }
}

module.exports = { jwtMiddleware }