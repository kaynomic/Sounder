const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

// Connect restoreUser midware to the API router
    // if curr user session is valid, req.user = curr user
    // if curr user is invalid, req.user is null
router.use(restoreUser);


module.exports = router;
