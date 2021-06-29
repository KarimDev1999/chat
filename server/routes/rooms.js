const router = require('express').Router();
const Room = require('../models/Room');
const Message = require('../models/Message');

router.post('/create', async (req, res) => {
    const user = req.body
    const newRoom = await Room.create({ creator: user._id })
    await newRoom.save()
    res.send(newRoom)
})


router.post('/add-message', async (req, res) => {
    const { roomId, authorId, text } = req.body
    const newMessage = await Message.create({
        room: roomId,
        author: authorId,
        text
    })
    await newMessage.save()
    res.send(newMessage)
})

router.get('/get-room/:roomId', async (req, res) => {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
        res.status(404).send('Комната не найдена')
    }
    res.send(room._id)
})

router.get('/get-messages/:roomId', async (req, res) => {
    const messages = await Message.find({ room: { $in: [req.params.roomId] } }).populate('author')
    res.send(messages)
})

module.exports = router