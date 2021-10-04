var express = require('express');
var router = express.Router();

const { createUser, login } = require('./controller/userController')
const { checkIsEmpty } = require('./lib/authMiddleWare/checkIsEmpty');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-user', checkIsEmpty, createUser);
router.post('/login', checkIsEmpty, login);

module.exports = router;
