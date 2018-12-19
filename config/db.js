const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat', { useNewUrlParser: true, useFindAndModify: false })

module.exports = mongoose.connection
