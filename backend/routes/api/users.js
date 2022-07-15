const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    const user = await User.signUp({ firstName, lastName, email, username, password });

    await setTokenCookie(res, user);

    return res.json({
        user
    });
})




module.exports = router;
