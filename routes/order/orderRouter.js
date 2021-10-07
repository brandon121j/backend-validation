var express = require("express");
var router = express.Router();
const { isAlpha, isInt } = require('validator')

var { jwtMiddleware } = require('../users/lib/authMiddleWare')
const Order = require('./model/Order');
const User = require('../users/model/User')
const errorHandler = require('../utils/errorHandler/errorHandler')

/* GET home page. */
router.get("/", function (req, res, next) {
    res.json({ message: 'order' });
});

router.post('/create-order', jwtMiddleware, async function(req, res) {

    try {

        const { orderName, orderAmount, orderItem } = req.body;

        let errObj = {}
    
        if (!isAlpha(orderName)) {
            errObj.orderName = "Order can only use letters"
        }
    
        if (!isInt(orderAmount)) {
            errObj.orderAmount = "Order amount can only be a number"
        }
    
        if (Object.keys(errObj).length > 0) {
            return res.status(500).json({
                messsage: "ERROR",
                error: errObj
            });
        }
    
        const decodedData = res.locals.decodedData;

        let foundUser = await User.findOne({ email: decodedData.email });

        const createdOrder = new Order({
            orderName,
            orderAmount,
            orderItem,
            orderOwner: foundUser._id 
        })

        let savedOrder = await createdOrder.save();

        foundUser.orderHistory.push(savedOrder._id);

        await foundUser.save();

        res.json({ message: "SUCCESS", createdOrder });

    } catch(error) {
        res.status(500).json({
            errorHandler(error)
        })
    }

})


module.exports = router;
