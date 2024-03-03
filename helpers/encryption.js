const bcrypt = require('bcrypt')
const saltRounds = +process.env.SALT_ROUNDS || 10
exports.encryptPassword = async (password) => {
    try {
        const encryptedPassword = await bcrypt.hash(password, saltRounds);
        return encryptedPassword
    } catch(e) {
        console.log('Error ==> ', e)
        return false
    }
}

exports.comparePassword = async (userInputPass, dbPass) => {
    try {
        const isValidPassword = await bcrypt.compare(userInputPass, dbPass)
        return isValidPassword
    } catch(e) {
        console.log('Error ==> ', e)
        return false
    }
}