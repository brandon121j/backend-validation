var express = require("express");
var router = express.Router();
var { jwtMiddleware } = require('../users/lib/authMiddleWare/shared/jwtMiddleware');
const { isAlpha, isInt } = require("validator");

const { 
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder
} = require('./controller/orderController')

/* GET home page. */
router.get("/", jwtMiddleware, getOrders);

router.post('/create-order', jwtMiddleware, createOrder);

router.put('/update-by-id/:id', jwtMiddleware, updateOrder);

router.delete('/delete-by-id/:id', jwtMiddleware, deleteOrder);

module.exports = router