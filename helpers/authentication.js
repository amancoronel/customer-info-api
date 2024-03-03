const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET

exports.generateToken = (data) => {
    const token = jwt.sign({ user: data }, secret, { expiresIn: process.env.SESSION_EXPIRATION})
    return token
}

exports.verifyToken = async (token, email) => {
    try {
        const decodedToken = jwt.verify(token, secret)
        return email === decodedToken.email
    } catch(e) {
        console.log('VERIFY TOKEN ERROR ==> ', e)
        return false
    }
}

