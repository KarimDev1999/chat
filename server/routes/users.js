const router = require('express').Router();
const passport = require('passport');


router.get('/current-user', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user)
})


module.exports = router