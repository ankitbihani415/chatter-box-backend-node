const AuthenticationValidator = require('./AuthenticationValidator')
const ChatValidator = require('./ChatValidator')
const MessageValidator = require('./MessageValidator')
const CheckValidationError = require('./CheckValidationError')

module.exports = {
    ...AuthenticationValidator,
    ...ChatValidator,
    ...MessageValidator,
    ...CheckValidationError,
}