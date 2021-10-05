const validator = require('validator');
const bcrypt = require('bcryptjs')
const User = require('../model/User');

async function createUser(req, res) {
    let body = req.body;
    const { firstName, lastName, username, email, password } = body;

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
    try {
        let foundUser = await User.findOne({ email: email });
        
        if (!foundUser) {
            return res.status(500).json({
                message: "error",
                error: "please go sign up",
            });
        } else {
            
        let comparedPassword = await bcrypt.compare(password, foundUser.password);
    
        if (!comparedPassword) {
            return res.status(500).json({
            message: "error",
            error: "Please check your email and password",
            });
        } else {
                return res.json({
                message: "success",
                });
            }
        }
    } catch (e) {
        res.status(500).json({ message: "error", error: e.message });
    }
}



module.exports = {
    createUser,
    login
}