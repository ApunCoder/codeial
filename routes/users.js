const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);

// route for signUp page
router.get('/sign-up', userController.signUp);

// route for signIn page
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);


module.exports = router;