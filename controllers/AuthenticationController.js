var AuthenticationService = require('../services/AuthenticationService');
var service = new AuthenticationService();

module.exports = {
	register:(req,res) => {
		service.register(req).then((result) => {
			res.status(200).send(result)
		})
		.catch((error) => {
			console.log(error)
			res.status(400).send(error)
		})
	},

	login:(req,res) => {
		console.log('hello')
		service.login(req).then((result) => {
			res.status(200).send(result)
		})
		.catch((error) => {
			console.log(error)
			res.status(400).send(error)
		})
	},

	verifyPhone:(req,res) => {
		service.verifyPhone(req).then((result) => {
			res.status(200).send(result)
		})
		.catch((error) => {
			console.log(error)
			res.status(400).send(error)
		})
	},

	resendPhoneVerificationCode:(req,res) => {
		service.resendPhoneVerificationCode(req).then((result) => {
			res.status(200).send(result)
		})
		.catch((error) => {
			console.log(error)
			res.status(400).send(error)
		})
	},	

}