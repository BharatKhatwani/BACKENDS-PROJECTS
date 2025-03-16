const express = require('express');
const {signup} = require("../Controller/authController")
const router = express.Router();
const {login} = require("../Controller/authController");



router.post('/signup', signup)
router.post('/login', login)

module.exports = router;