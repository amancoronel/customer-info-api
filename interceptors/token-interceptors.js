const { verifyToken } = require('../helpers/authentication')
module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(200).json({ result: false, error: 'Access denied' }); // NO TOKEN
    const access_token = token.split(' ')
    const tokenVerified = await verifyToken(access_token[1])
    if(!tokenVerified) return res.status(200).json({ result: false, error: 'Access denied' }); // INVALID TOKEN
    if(!req.session.user) return res.status(200).json({ result: false, error: 'Access denied' }); // NO SESSION
    return next()
}