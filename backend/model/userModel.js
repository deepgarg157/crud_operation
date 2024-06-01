const mongoose = require('mongoose')

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('user', schemaUser)