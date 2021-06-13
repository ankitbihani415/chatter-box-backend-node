const express = require('express');
const router = express.Router();

// Import Controllers
const profileController = require('../controllers/ProfileController');

// Profile Routes
router.get('/my-profile',profileController.myProfile);


module.exports = router;
