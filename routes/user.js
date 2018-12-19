const express = require('express')
const userController = require('./controllers/user')
const passport = require('passport')

let router = express.Router()

router.get('/', [
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        return res.json(
            { ...req.user, token: req.headers['Authentication'].split(' ')[1] })
    }
])
router.post('/login', [userController.login])
router.post('/signUp', [userController.signUp])

module.exports = router
