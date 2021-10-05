const { validateCreateData } = require('./authCreateMiddleware/validateCreateData');
const { validateLoginData } = require('./authLoginMiddleware/validateLoginData');
const { checkIsEmpty } = require('./shared/checkIsEmpty');
const { checkIsUndefined } = require('./shared/checkIsUndefined');
const { jwtMiddleware } = require('./shared/jwtMiddleware');

module.exports = {
    validateCreateData,
    validateLoginData,
    checkIsEmpty,
    checkIsUndefined,
    jwtMiddleware
}