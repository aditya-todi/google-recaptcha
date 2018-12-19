const passportJWT = require("passport-jwt")
const UserModel = require('../../../models/user')
const config = require('../../config')

module.exports = () => {
    passport.use(new passportJWT.Strategy({
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    },
        function (jwtPayload, done) {
            UserModel.findOne({
                username: jwtPayload.username
            })
                .then(user => {
                    return done(null, {
                        username: user.username,
                        name: user.name,
                        author: user.author,
                        admin: user.admin
                    })
                })
                .catch(err => {
                    return done(err, false)
                })
        }
    ))
}
