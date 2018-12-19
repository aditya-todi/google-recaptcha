const passport = require('passport');
const { Strategy } = require('passport-local');
const UserData = require('../../../models/user')

module.exports = () => {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        UserData.findOne({
            username
        })
            .then((user) => {
                if (user.validatePassword(password)) {
                    done(null, {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        author: user.author,
                        admin: user.admin
                    })
                }
                else {
                    done(null, false)
                }
            })
            .catch((err) => {
                done(err, false)
            })
    }))
}
