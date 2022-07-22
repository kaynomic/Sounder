const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser midware to the API router
    // if curr user session is valid, req.user = curr user
    // if curr user is invalid, req.user is null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;
