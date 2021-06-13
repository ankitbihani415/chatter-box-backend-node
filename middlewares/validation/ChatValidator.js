const { check } = require('express-validator');
const User = require('../../models/User');
const Chat = require('../../models/Chat');

const ChatValidatationRules = () => {
	return[
		check('participants').exists().withMessage('Participant Field Required.')
					.isArray({
						min:2,
						max:5
					})
					.custom(value => {
						value.map(participant => {
							return User.findOne({
								_id:participant,
								blocked:false,
							}, async(err,user) => {
								if(user){
									return true;
								}else{
									return Promise.reject('You can\'t start chat with this user.')
								}
							})
						})
					}),

		check('name').optional()
					.isString().withMessage('Chat name Should be String')
	];
}

module.exports = {
	ChatValidatationRules
}