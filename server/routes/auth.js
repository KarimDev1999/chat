const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { password, email, username } = req.body;
    if (!password || !email || !username) {
        return res.status(500).send('all fields are required')
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
        return res.status(500).send('user with this email already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ password: hashedPassword, email, username })
    await newUser.save();
    const access_token = await jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.send({ access_token, user: newUser })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).send('all fields are required')
    }
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(500).send('wrong password or email')
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        return res.status(500).send('wrong password or email')
    }
    console.log(process.env.JWT_SECRET)
    const access_token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.send({ access_token, user })
});


module.exports = router