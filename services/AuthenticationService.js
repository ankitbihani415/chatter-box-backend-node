var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRounds = 10

var UserModel = require('../models/User');

// Import Helpers
const {randomInt} = require('../helpers');


module.exports = class AuthenticationService {
	constructor(){

	}

	async register(request){
		// const salt = bcrypt.genSaltSync(10);
		const hash = await bcrypt.hash(request.body.password, saltRounds);
		const body = {
			phone: request.body.phone,
			password:hash
		}
		console.log('body', body)
		return new Promise((resolve, reject) => {
			UserModel.create(body, async(err,user) => {
				if(err){
					reject({
        				"status" 		: 	"fail",
	        			"messages"		: 	"User registration fails",
	        			"errors"		: 	[err],
	        		});
				}else{
					resolve({
	        			"status" 		: 	"success",
	        			"messages"		: 	"User registerred successfully",
        				"user"			: 	user
	        		});
				}
			})
		})
	}

	login(request){
		return new Promise((resolve, reject) => {
			UserModel.findOne({phone:request.body.phone}, async(err,user) => {
				if(err) throw err;
				if(user){
					// const comparePwd = await bcrypt.compare(request.body.password, user.password);
					// console.log('comparePwd ',comparePwd)
					if(true){
						if(!user.phone_verified_at){
							reject({
		        				"status" 		: 	"fail",
								"messages"		: 	"Bad Request",
								"errors"		:	[
									"Please Verify Phone",
								]
			        		});
						}
						var token = jwt.sign({ user: user }, 'supersecret', {
					    	expiresIn: 8640000 // 86400 expires in 24 hours
					    });
						resolve({
		        			"status" 		: 	"success",
		        			"messages"		: 	"User Logged In successfully",
	        				"user"			: 	user,
	        				"token"			: 	token,
		        		});
		        	}
		        	else{
		        		reject({
	        				"status" 		: 	"fail",
							"messages"		: 	"Bad Request",
							"errors"		:	[
								"Wrong Password",
							]
		        		});
		        	}
				}else{
					reject({
        				"status" 		: 	"fail",
						"messages"		: 	"Bad Request",
						"errors"		:	[
							"User Not Found with phone number",
						]
	        		});
				}
			})
		})
	}

	verifyPhone(request){
		return new Promise((resolve, reject) => {
			UserModel.findOne({phone:request.body.phone}, async(err,user) => {
				if(user){
					if(user.phone_verified_at){
						reject({
	        				"status" 		: 	"fail",
		        			"messages"		: 	"Phone Already Verified",
		        		});
					}
					if(user.phone_verification_code == request.body.phoneVerificationCode){
						user.phone_verification_code = null
						user.phone_verified_at = Date.now()
						await user.save();
						resolve({
		        			"status" 		: 	"success",
		        			"messages"		: 	"Phone Verified successfully",
		        		});
					}else{
						reject({
	        				"status" 		: 	"fail",
		        			"messages"		: 	"Phone Verification Code not matched",
		        		});	
					}
				}
				else{
					reject({
        				"status" 		: 	"fail",
	        			"messages"		: 	"User Not Found with phone number",
	        		});
				}
			})
		})	
	}

	resendPhoneVerificationCode(request){
		return new Promise((resolve, reject) => {
			UserModel.findOne({phone:request.params.phone}, async(err,user) => {
				if(user){
					if(user.phone_verified_at){
						reject({
	        				"status" 		: 	"fail",
		        			"messages"		: 	"Phone Already Verified",
		        		});
					}
					user.phone_verification_code = randomInt();
					await user.save();
					resolve({
	        			"status" 		: 	"success",
	        			"messages"		: 	"Phone Verification Code send successfully",
	        		});
				}
				else{
					reject({
        				"status" 		: 	"fail",
	        			"messages"		: 	"User Not Found with phone number",
	        		});
				}
			})
		})
	}
}
