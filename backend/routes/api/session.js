const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation.js');

const router = express.Router();

// 'Checking' the login credentials
const validateLogin = [
    check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),

    check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),

    handleValidationErrors
];

// Restore session user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({});
});

// Log in
router.post('/login', validateLogin, async (req, res, next) => {

    const { email, password } = req.body;

    // console.log("email: ", email);
    // console.log("password: ", password);

    const user = await User.login({ email, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided email or password is invalid.'];
        return next(err);
    }

    const jToken = await setTokenCookie(res, user);

    if (jToken) {
        user.dataValues.token = jToken;
      } else {
        user.dataValues.token = "";
      }

    return res.json(user);
});

router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});


module.exports = router;
