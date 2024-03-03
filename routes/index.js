const ROUTES = require('./api')
const { LoginInterceptor, SignupInterceptor } = require('../interceptors')
const { encryptPassword, comparePassword } = require('../helpers/encryption')
const { addData, getData } = require('../helpers/db')
const { generateToken } = require('../helpers/authentication')
module.exports = (app) => {
    app.use('/api', ROUTES)

    app.post('/login', LoginInterceptor, async (req, res) => {
        try {
            const { email, password } = req.body
            const customerData = await getData({ email }, "customers")
            if(!customerData.result) {
                return res.status(200).json({ result: false, error: "Authentication failed"})
            }
            const { data } = customerData
            const { password: customerPassword } = data
            const isValidUser = await comparePassword(password, customerPassword)
            if(isValidUser) {
                const customerInfo = {
                    first_name: data.first_name,
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    email: data.email,
                    location: data.location
                }
                const token = await generateToken(customerInfo)
                if(!token) throw 'Error generating token'
                req.session.user = customerInfo
                req.session.token = token
                res.status(200).json({ result: true, data: customerInfo, access_token: token })
            } else {
                res.status(200).json({ result: false, error: "Email and password not matched"})
            }
        } catch(e) {
            console.log('ERROR ==> ', e)
            res.status(200).json({ result: false, error: "Something went wrong"})

        }
    })
    app.post('/signup', SignupInterceptor, async (req, res) => {
        const { password } = req.body
        const newPassword = await encryptPassword(password)
        const dataToSave = {
            ...req.body,
            password: newPassword
        }

        const response = await addData(dataToSave, 'customers')
        const { result } = response
        res.status(result ? 200 : 400).json({ result: result, message: result ? "Signup successful" :"Email already exists" })
    })

    app.post('/logout', (req, res) => {
        req.session.destroy();
        res.status(200).json({ result: true, message: "Logged out successfully"})
    })
}