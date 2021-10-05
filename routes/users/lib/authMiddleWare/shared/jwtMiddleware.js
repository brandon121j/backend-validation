const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
    try {
        console.log(req.headers)

        res.json({ message: "SUCCESS"})
    } catch(e) {
        res
            .status(500)
            .json({ message: "ERROR", error: e.message })
    }
}

module.exports = { jwtMiddleware }