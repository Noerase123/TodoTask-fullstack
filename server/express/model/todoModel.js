const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {type: String, required: true},
    listType: {type: String},
    container: {type: String},
    dateCreated: {type: String},
    isDeleted: {type: Number}
})

module.exports = mongoose.model('todoModel', todoSchema)