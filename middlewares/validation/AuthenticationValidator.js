const { check } = require('express-validator');
const User = require('../../models/User');

const registerValidationRules = () => {
  	return [
			check('phone').exists().withMessage('Phone Field is required')
						.bail()
						.isInt().withMessage('Phone Field should be numeric')
						.bail()
						.isLength({min:10,max:10}).withMessage('Phone should be of 10 digits')
						.custom(value => {
    						return User.findOne({'phone':value}).then(user => {
								if (user) {
									return Promise.reject('Phone Number already in use');
								}
							});
						}),
			check('password').exists().withMessage('Password Field is required')
						.bail()
						.isLength({min:8}).withMessage('Password length should be greater then 8'),
			
			// check('name','Name Field should contains alphabatic characters').isAlpha(),
		];
}

const loginValidationRules = () => {
  	return [
			check('phone').exists().withMessage('Phone Field is required')
						.bail()
						.isInt().withMessage('Phone Field should be numeric')
						.bail()
						.isLength({min:10,max:10}).withMessage('Phone should be of 10 digits'),
						
			check('password').exists().withMessage('Password Field is required')
						.bail()
						.isLength({min:8}).withMessage('Password length should be greater then 8'),
			
			// check('name','Name Field should contains alphabatic characters').isAlpha(),
		];
}

const verifyPhoneValidationRules = () => {
	return [
			check('phone').exists().withMessage('Phone Field is required')
						.isInt().withMessage('Phone Field should be numeric')
						.isLength({min:10,max:10}).withMessage('Phone should be of 10 digits'),
						
			check('phoneVerificationCode')
					.exists().withMessage('Phone Verification Code Field is required')
					.isLength({min:6,max:6}).withMessage('Phone Verification Code length should be greater then 8'),
		];	
}
module.exports = {
	registerValidationRules,
	loginValidationRules,
	verifyPhoneValidationRules
}