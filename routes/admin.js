const express = require('express');
const adminController = require('./controllers/admin')

let router = express.Router()

router.get('/dropdb/:dbname', [adminController.authAdmin, adminController.dropDB])
router.get('/docs/:dbname', [adminController.authAdmin, adminController.documents])

module.exports = router
