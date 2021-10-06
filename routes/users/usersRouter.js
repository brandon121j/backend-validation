const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
const { createUser, login } = require('./controller/userController')

const { 
  checkIsEmpty, 
  checkIsUndefined, 
  validateCreateData, 
  validateLoginData,
  jwtMiddleware,
  validateUpdateData 
} = require('./lib/authMiddleWare/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post(
  '/create-user', 
  checkIsUndefined, 
  checkIsEmpty, 
  validateCreateData,
  createUser
);

router.post(
  '/login', 
  checkIsUndefined, 
  checkIsEmpty, 
  validateLoginData,
  login
);

router.put(
  '/profile', 
  jwtMiddleware, 
  checkIsUndefined, 
  checkIsEmpty,
  validateUpdateData
  );


module.exports = router;
