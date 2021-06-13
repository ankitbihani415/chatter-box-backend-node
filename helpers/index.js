var jwt = require('jsonwebtoken');
const jwtSecret = 'supersecret';
// const UserModel = require('../models/User')

const verifyToken = (token) => {
	var verify = false
	jwt.verify(token, jwtSecret, function(err, decoded) {
		if (!err){
			verify = decoded.user;
		}
	});
	return verify
}

const randomInt = () => {
	var low = 100000
	var high = 999999
	return Math.floor(Math.random() * (high - low) + low)
}

const authenticateRoute = (req, res, next) => {
	// Authenticated routes
	const token = req.headers['authorization'];
	if (!token){
		return res.status(401).send({ auth: false, message: 'No token provided.' });
	} 
	const decodeToken = verifyToken(token);
	if(!decodeToken){
		return res.status(400).send({ auth: false, message: 'Failed to authenticate token.' })
	}
	else{
		req.auth_user = decodeToken
		next()
	}
}



module.exports = {
	verifyToken,
	randomInt,
	authenticateRoute,
}