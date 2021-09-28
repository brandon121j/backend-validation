const User = require('../model/User');

async function createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body
    
    try {
        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password 
        });

        let savedUser = await createdUser.save();

        res.json({ message: "SUCCESS", payload: savedUser })
    } 
    catch(error) {
        res
            .status(500)
            .json({ message: "FAILURE", error: error.message })
    }
}

module.exports = {
    createUser,
}