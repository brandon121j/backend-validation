const User = require('../model/User');

function checkForNumbersAndSymbols(target) {
    if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
        return true
    } else {
        return false
    }
}

function checkForEmptyFields(target) {
    if (target.length === 0) {
        return true
    } else {
        return false
    }
}

async function createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body

    let errObj = {};

    // ! ANOTHER MEANS OF NUMBER AND SPECIAL CHARACTER VALIDATION USING THE SAME FUNCTION ABOVE !
    if (checkForNumbersAndSymbols(firstName)) {
        errObj.firstName = "First Name cannot have special character or numbers"
    }

    if (checkForNumbersAndSymbols(lastName)) {
        errObj.lastName = "Last Name cannot have special character or numbers"
    }

    // More dynamic way of doing the same if statements you used below
    for (let key in body) {
        if (checkForEmptyFields(body[key])) {
            errObj[`${key}`] = `${key} cannot be empty`;
        }
    }

    // if (checkForEmptyFields(firstName)) {
    //         errObj.firstName = "First Name is required!"
    //     }

    // if (checkForEmptyFields(lastName)) {
    //     errObj.lastName = "Last Name is required"
    // }

    if (Object.keys(errObj).length > 0) {
        return res
        .status(500)
        .json({
            message: "ERROR",
            error: errObj
        });
    }


    // if (checkForNumbersAndSymbols(firstName)) {
    //     return res
    //     .status(500)
    //     .json({ 
    //         message: "ERROR",
    //         error: "First name cannot contain special characters or numbers"
    //     })
    // }
    
    // ! ONE SOLUTION FOR SPECIAL CHARACTER AND NUM VALIDATOR !
    // if (firstName.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
    //     res
    //         .status(500)
    //         .json({
    //             message: "ERROR",
    //             error: "First name cannot contain special characters or numbers"
    //         })
    // }

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