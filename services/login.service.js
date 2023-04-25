const jwt = require('jsonwebtoken');
const Boom = require('boom');

function validateLoginPayload({ login_email, login_password, document_prefix }) {
    console.log(login_email, process.env.login_email);
    console.log(login_password, process.env.login_password);
    if (login_email === process.env.login_email && login_password === process.env.login_password) {
        return generateJWTToken({ login_email, document_prefix });
    } else {
        throw Boom.unauthorized();
    }
}

function generateJWTToken({ login_email, document_prefix }) {
    const token = jwt.sign({ login_email, document_prefix }, process.env.JWT_SECRET)
    return token;
}

module.exports = {
    validateLoginPayload,
    generateJWTToken
};