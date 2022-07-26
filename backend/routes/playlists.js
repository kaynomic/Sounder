const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser, setTokenCookie } = require("../utils/auth.js");
const { Album, User, Song, Playlist, PlaylistSong } = require('../db/models');


/* ---------------------- GET ----------------------- */

// Get details of a playlist from an id
router.get('/:playlistId', async (req, res) => {
    const { playlistId } = req.params;

    const playlist = await Playlist.findByPk(playlistId, {
        include: [
            {
                model: Song,
                through: {
                    attributes: []
                }
            }
        ]
    });

    if (!playlist) {
        const err = new Error("Playlist not found");
        err.status = 404;
        throw err;
    }


    res.json(playlist);
})

/* ---------------------- POST ----------------------- */

// Create a playlist
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    const { name, userId, previewImage } = req.body;

    const playlist = await Playlist.create({
        userId: user.id,
        name,
        previewImage
    })

    res.json(playlist);
})


// Add song to playlist based on playlist's id
router.post('/:playlistId', requireAuth, async (req, res) => {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!song) {
        const err = new Error("Song not found");
        err.status = 404;
        throw err;
    }

    if (!playlist) {
        const err = new Error("Playlist not found");
        err.status = 404;
        throw err;
    }

    if (playlist) {
        if (song) {
            const updatePS = await PlaylistSong.create({
                playlistId,
                songId
            })

            const pSong = await PlaylistSong.findOne({
                where: { playlistId, songId }
            })

            res.json(pSong);
        }
    }
})

/* ---------------------- PUT ----------------------- */

// Edit a playlist
router.put('/:playlistId', requireAuth, async (req, res) => {
    const { playlistId } = req.params;
    const { name, previewImage } = req.body;

    const playlist = await Playlist.findByPk(playlistId);

    if (playlist) {
        const update = await playlist.update({
            name,
            previewImage
        })

        res.json(update);

    } else {
        const err = new Error("Playlist not found");
        err.status = 404;
        throw err;
    }
})

/* ---------------------- DELETE ----------------------- */

// Delete a playlist
router.delete('/:playlistId', requireAuth, async(req, res) => {
    const { playlistId } = req.params;

    const playlist = await Playlist.findByPk(playlistId);

    if (playlist) {
        playlist.destroy();

        res.json({ msg: "Successfully deleted playlist", statusCode: 200 })
    } else {
        const err = new Error("Playlist not found");
        err.status = 404;
        throw err;
    }
})


module.exports = router;
