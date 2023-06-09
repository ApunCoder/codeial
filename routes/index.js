const express = require('express');
const router = express.Router();

console.log('router loaded');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/users',require('./post'));

module.exports = router;