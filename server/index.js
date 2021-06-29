const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const passport = require('passport');

//socket-io start
const io = require("socket.io")(8080, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on('connection', (socket) => {
    socket.on('addUser', (userId, roomId) => {
        socket.join(roomId);
        io.to(roomId).emit('room', userId)
    })

    socket.on('newMessage', (message) => {
        io.to(message.room).emit('getMessage', message)
    })

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });
})
// socket-io end

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
require('./config/jwtStrategy')(passport)


app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/rooms', require('./routes/rooms'))

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }, () => {
        console.log('MongoDB connected successfuly');
    }
);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})



