

function checkIsUndefined (req, res, next) {
    let body = req.body

    if (Object.keys(req.body).length === 0) {
        return res.status(500).json({
            message: "FAILURE",
            error: "Please complete form"
        })
    } else {
        next();
    }

}

module.exports = { checkIsUndefined }