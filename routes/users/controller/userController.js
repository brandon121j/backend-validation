const validator = require('validator');
const User = require('../model/User');

const {
    isAlpha,
    isAlphaNumeric,
    isEmail,
    isStrongPassword
} = require('validator');

async function createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body;
    let body = req.body;
    let errObj = {};

    if (!isAlpha(firstName)) {
        errObj.firstName = "First Name cannot have special characters or numbers";
    }
    
    if (!isAlpha(lastName)) {
        errObj.lastName = "Last Name cannot have special characters or numbers";
    }
    
    if (!isAlphanumeric(username)) {
        errObj.username = "Username cannot have special characters";
    }
    
    if (!isEmail(email)) {
        errObj.email = "please enter a valid email";
    }
    
    if (!isStrongPassword(password)) {
        errObj.password =
        "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({
            message: "ERROR",
            error: errObj
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body

    let errObj = {}

    if (isEmpty(password)) {
        errObj.password = "Password cannot be empty"
    }

    if (isEmpty(email)) {
        errObj.email = "Email cannot be empty"
    }

    if (!isEmail(email)) {
        errObj.email = "Please enter a valid email"
    }

    if (Object.keys.keys(errObj).length > 0) {
        return res.status(500).json({
            message: "ERROR",
            error: errObj
        })
    }

    let foundUser = await User.findOne({ email: email })

    res.json({ foundUser })
    
    try {

    } catch(e) {
        res.status(500).jason({ message: "ERROR", error: error.message })
    }
}

module.exports = {
    createUser,
    login
}