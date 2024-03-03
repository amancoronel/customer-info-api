const express = require('express')
const router = express.Router()
const { TokenInterceptor } = require('../../interceptors')
const { getData, updateData } = require('../../helpers/db')

router.get('/token', TokenInterceptor, (req, res) => {
    if(req.session.user) {
        return res.status(200).json({ result: true, data: req.session.user, token: req.session.token})
    }
        return res.json({ result: false })
})

router.get('/user-info', TokenInterceptor, async (req, res) => {
    const { id } = req.query
    const userData = await getData({ _id: id }) // NO PASSWORD
    if(userData) {
        delete userData.password
        res.send({ result: true, data: userData })
    } else {
        res.send({ result: false, error: "User not found"})
    }
})

// UPDATE
router.post('/update-user-info', TokenInterceptor, async (req, res) => {
    const { id } = req.query
    const userData = await updateData({ _id: id }, req.body) // NO PASSWORD
    if(userData) {
        const { data } = userData
        delete data.password
        res.send({ result: true, data })
    } else {
        res.send({ result: false, error: "User not found"})
    }
})

module.exports = router