const express = require('express');
const router = express.Router();
const { AuthController } = require('../controllers/auth.controller');

const { validate, checkSchema } = require('../validators');
const { loginSchema } = require('../validators/login.schema');

router.post('/', validate(checkSchema(loginSchema)), AuthController.login);

module.exports = router;