const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema

let user = new Schema({
    id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    author: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
})

user.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`)
}

user.methods.validatePassword = function (password) {
    let hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`)
    return this.password === hash
}

module.exports = mongoose.model('User', user)