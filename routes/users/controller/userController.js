const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const errorHandler = require('../../utils/errorHandler');

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
    const { email, password } = req.body
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
                let jwtToken = jwt.sign (
                    {
                        email: foundUser.email,
                        username: foundUser.username
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                );

                res.json({ message: "SUCCESS", payload: jwtToken });
            }
        }
    } catch (e) {
        res.status(500).json({ message: "error", error: e.message });
    }
}

async function updateUser(req, res) {
    
    try {

        const { password } = req.body

        const decodedData = res.locals.decodedData

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword

        let updatedUser = await User.findOneAndUpdate(
            { email: decodedData.email },
            req.body,
            { new: true }
        );

        res.json({
            message: "SUCCESS",
            payload: updatedUser
        })
    } catch (error) {
        res
            .status(500)
            .json({
                message: "ERROR",
                error: error.message
        })
    }
}

module.exports = {
    createUser,
    login,
    updateUser
}