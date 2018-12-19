const db = require('../../config/db')
const mongoose = require('mongoose')

const authAdmin = async (req, res, next) => {
    if (req.user && req.user.admin) {
        next()
    } else {
        res.status(401).json({
            message: 'not authorised'
        })
    }
}

const dropDB = async (req, res) => {
    db.collections[req.params.dbname].drop((err) => {
        if (!err) {
            res.json({
                message: req.params.dbname + ' dropped successfully'
            })
        }
        else {
            res.status(500).json({
                error: err
            })
        }
    })
}

const documents = async (req, res) => {
    mongoose.model(req.params.dbname).find()
        .then((docs) => {
            res.json({
                documents: docs
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: 'cannot get documents for ' + req.params.dbname,
                err: err
            })
        })
}

module.exports = {
    dropDB,
    authAdmin,
    documents
}