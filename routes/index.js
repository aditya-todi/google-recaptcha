const user = require('./user')
const admin = require('./admin')

module.exports = (app) => {
    app.use('/user', user)
    app.use('/admin', admin)
}