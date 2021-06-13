const { validationResult } = require('express-validator');
var fs = require('fs');

const validate = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}
	const extractedErrors = []
	// errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
	errors.array().map(err => extractedErrors.push(err.msg))

	if(req.file && req.file.path){
		fs.unlinkSync(req.file.path);
		// console.log('file deleted')
	}
	// console.log('imgae validate => ',req.file.filename)
							
	return res.status(422).json({
		errors: extractedErrors,
	})
}


module.exports = {
	validate,
}
