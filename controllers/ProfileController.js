// Import Models
const User = require('../models/User');

module.exports = {
	myProfile:(req,res) => {
		return res.status(200)
				.send({
						status:'Success', 
						message: 'User Found Success.',
						user: req.auth_user
					});
	},
}