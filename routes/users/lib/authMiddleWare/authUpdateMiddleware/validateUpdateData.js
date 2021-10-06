const {
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword
} = require('validator');

function validateUpdateData() {

    const { firstName, lastName, username, email, password, confirmPassword } = req.body;
    let errObj = {};

    if (!isAlpha(firstName)) {
        errObj.firstName = "First name cannot have any special characters or numbers"
    }

    if (!isAlpha(lastName)) {
        errObj.lastName = "Last name cannot have any special characters or numbers"
    }

    if (!isAlphanumeric(username)) {
        errObj.username = "Username cannot have special characters"
    }

    if (!isEmail(email)) {
        errObj.email = "Please enter a valid email"
    }

    if (!isStrongPassword(password)) {
        errObj.password = 
        "Your password must contain 1 lowercase, 1 uppercase, 1 special character"
    }

    if (password !== confirmPassword) {
        errObj.confirmPassword = "Password and confirm password must match"
    }
    
    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({
            message: "ERROR",
            error: errObj
        });
    } else {
        next()
    }
}

module.exports = { validateUpdateData }