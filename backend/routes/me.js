const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser, setTokenCookie } = require("../utils/auth.js");
const { User, Song, Album, Playlist } = require('../db/models');

/* ---------------------- GET ----------------------- */

// Get Current User
router.get('/', requireAuth, async (req, res, next) => {
    const { user, cookies } = req;
    const jToken = await setTokenCookie(res, user);
    const me = await User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ["id","firstName", "lastName", "username", "email"]
    });

    if (me) {
        me.dataValues.token = jToken;
        return res.json(me);
    } else {
        me.dataValues.token = "";
        return res.json({});
    }
});

// Get all Songs created by Current User
router.get('/songs', requireAuth, async (req, res) => {
    const { user } = req;

    const songs = await Song.findAll({
        where: {
            userId: user.id
        }
    })
    res.json(songs);
})

// Get all Albums created by Current User
router.get('/albums', requireAuth, async (req, res) => {
    const { user } = req;

    const albums = await Album.findAll({
        where: {
            userId: user.id
        }
    })
    res.json(albums)
})

// Get all Playlists created by Current User
router.get('/playlists', requireAuth, async (req, res) => {
    const { user } = req;

    const playlists = await Playlist.findAll({
        where: {
            userId: user.id
        }
    })
    res.json(playlists)
})

module.exports = router;
