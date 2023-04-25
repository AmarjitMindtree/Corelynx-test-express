const express = require('express');
const router = express.Router();

const { userValidationMiddleware } = require('../middlewares/validateUser');
const loginService = require = require('../services/login.service');

// login route
router.post('/login', userValidationMiddleware, (req, res) => {
    try {
        const token = loginService.validateLoginPayload(req.body)
        res.status(200).json({ token });
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message || 'Something went wrong.')
    }
});

module.exports = router;