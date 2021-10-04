var express = require('express');
var router = express.Router();
const { createUser, login } = require('./controller/userController')

const { checkIsEmpty } = require('./lib/authMiddleWare/authCreateMiddleware/checkIsEmpty');
const { validateLoginData } = require('./lib/authMiddleWare/authLoginMiddleware/validateLoginData');
const { checkIsUndefined } = require('./lib/authMiddleWare/authCreateMiddleware/checkIsUndefined');
const { validateCreateData } = require('./lib/authMiddleWare/authCreateMiddleware/validateCreateData');

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

module.exports = router;
