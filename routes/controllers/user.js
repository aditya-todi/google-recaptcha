const passport = require('passport');
const UserData = require('../../models/user');
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const login = async (req, res) => {
    passport.authenticate('local', function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'login error',
                error: err
            })
        }
        if (!user) {
            return res.status(401).json({
                message: 'invalid credentials'
            })
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.json({
                    message: 'login unsuccessfull',
                    error: err
                })
            }
            const token = jwt.sign(user, config.secret)
            return res.json({
                ...user,
                token
            })
        })
    })(req, res)
}

const signUp = async (req, res) => {
    console.log(req.body)
    let user = new UserData(req.body)
    user.setPassword(req.body.password)
    user.save()
        .then((doc) => {
            usr = {
                username: doc.username,
                name: doc.name,
                author: doc.author,
                admin: doc.admin
            }
            let token = jwt.sign(usr, config.secret)
            req.login(usr, () => {
                res.json({
                    ...usr,
                    token
                })
            })
        })
        .catch((err) => {
            console.log(err.toString())
            res.status(500).json({
                error: err.toString(),
                auth: false
            })
        })
}

module.exports = {
    login,
    signUp,
}