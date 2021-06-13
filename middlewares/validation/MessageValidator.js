const { check } = require('express-validator');

const MessageValidationRules = () => {
	return [
		check('chat_id').exists().withMessage('Chat id field is Required.')
					.isArray({
						min:2,
						max:5
					}),

		check('message').exists()
					.withMessage('Message is required')
	]
}

module.exports = {
	MessageValidationRules,
}