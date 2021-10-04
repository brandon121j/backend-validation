const validator = require('validator');
const bcrypt = require('bcryptjs')
const User = require('../model/User');

const {
    isAlpha,
    isAlphanumeric,
    isEmpty,
    isEmail,
    isStrongPassword
} = require('validator');

function validRegister(value) {
    let errObj = {};

    if (!isAlpha(value.firstName)) {
        errObj.firstName = "First name cannot have any special characters or numbers"
    }

    if (!isAlpha(value.lastName)) {
        errObj.lastName = "Last name cannot have any special characters or numbers"
    }

    if (!isAlphanumeric(value.username)) {
        errObj.username = "Username cannot have special characters"
    }

    if (!isEmail(value.email)) {
        errObj.email = "Please enter a valid email"
    }

    if (!isStrongPassword(value.password)) {
        errObj.password = 
        "Your password must contain 1 lowercase, 1 uppercase, 1 special character"
    }

    if (Object.keys(errObj).length > 0) {
        return res
            .status(500)
            .json({ message: "ERROR", error: errObj })
    }
}

async function createUser(req, res) {
    let body = req.body;
    const { firstName, lastName, username, email, password } = body;

    validRegister(body);
    try {
        let salt = await bcrypt.genSalt(10)
        let hashed = await bcrypt.hash(password, salt)
        const createdUser = new User ({
            firstName,
            lastName,
            username,
            email,
            password: hashed
        })
        let savedUser = await createdUser.save();
        res.json({ message: "SUCCESS", savedUser })
    } catch(error) {
        res.status(500).json({ message: "FAILURE", error: error.message})
    }
}

async function login(req, res) {

}



module.exports = {
    createUser,
    login
}