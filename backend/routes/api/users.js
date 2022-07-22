const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const router = express.Router();

const validateSignup = [
    check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your first name.'),

    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide your last name.'),

    check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),

    check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),

    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email'),

    check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),

    handleValidationErrors
];

router.post('/signup', validateSignup, async (req, res) => {
    const { firstName, lastName, email, username, password, previewImage } = req.body;
    const check = await User.findOne({ where: { email } });

    if (check) {
        let err = new Error("Email must be unique");
        err.status = 403;
        err.errors = ["Email must be unique"];
        throw err;
    }

    const user = await User.signUp({ firstName, lastName, email, username, password, previewImage });

    const token = await setTokenCookie(res, user);

    return res.json({ ...user.toSafeObject(), token });
})

module.exports = router;
