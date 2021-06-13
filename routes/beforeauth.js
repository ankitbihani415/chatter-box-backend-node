var express = require('express');
var router = express.Router();

var authController = require('../controllers/AuthenticationController');

// Import Validators
const {
	validate,
	registerValidationRules, 
	loginValidationRules,
	verifyPhoneValidationRules
} = require('../middlewares/validation')


router.post('/register', registerValidationRules(), validate, authController.register);		
router.post('/login', loginValidationRules(), validate, authController.login);
router.post('/verify-phone',verifyPhoneValidationRules(), validate, authController.verifyPhone);
router.get('/resend-verification-code/:phone', authController.resendPhoneVerificationCode);

module.exports = router;
