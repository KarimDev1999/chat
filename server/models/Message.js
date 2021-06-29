const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageSchema = new mongoose.Schema({
    text: { type: String, require: true },
    room: { type: Schema.Types.ObjectId, require: true, ref: 'Room' },
    author: { type: Schema.Types.ObjectId, require: true, ref: 'User' }
})

module.exports = mongoose.model("Message", MessageSchema)