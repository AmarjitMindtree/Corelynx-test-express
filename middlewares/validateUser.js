
const jwt = require('jsonwebtoken');

function userValidationMiddleware(req, res, next) {
    console.log(req.body);
    const { login_email, login_password } = req.body;

    if (!login_email || !login_password) {
        return res.status(400).json({
            message: 'Email and password are required.'
        });
    }
    // if any additional validation required goes here
    next();
}

function tokenValidationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.login_email !== process.env.login_email) {
            res.status(400).json({ message: 'Invalid token.' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = { 
    userValidationMiddleware,
    tokenValidationMiddleware
 };