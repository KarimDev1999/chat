const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoomSchema = new mongoose.Schema({
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model("Room", RoomSchema)