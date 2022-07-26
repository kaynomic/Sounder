const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser, setTokenCookie } = require("../utils/auth.js");
const { Album, User, Song, Playlist } = require('../db/models');

/* ---------------------- GET ----------------------- */

// Get all songs of an Artist based on id
router.get('/:artistId/songs', async (req, res) => {
    const { artistId } = req.params;

    const artist = await User.findByPk(artistId);

    if (artist) {
        const songs = await Song.findAll({
            where : { userId: artistId },
            attributes: [
                "id", "userId", "albumId", "title", "description","url", "createdAt", "updatedAt"
            ]
        })

        res.json(songs);

    } else {
        const err = new Error("Artist not found");
        err.status = 404;
        throw err;
    }
})



// Get all albums of an Artist based on the Artist's id
router.get('/:artistId/albums', async (req, res) => {
    const { artistId } = req.params;

    const artist = await User.findByPk(artistId);

    if (artist) {
        const Albums = await Album.findAll({
            where: { userId: artistId }
        });

        res.json({ Albums });

    } else {
        const err = new Error("Artist not found");
        err.status = 404;
        throw err;
    }
})


// Get details of an Artist by id
router.get('/:artistId', async (req, res) => {
    const { artistId } = req.params;
    const totalSongs = await Song.count({ where: { userId: artistId } });
    const totalAlbums = await Album.count({ where: { userId: artistId } });

    const artist = await User.findByPk(artistId, {
        attributes: [
            "id", "username", "previewImage"
        ],
        include: [
            {
                model: Song,
                attributes: ["previewImage"]
            }
        ]
    })

    if (artist) {
        artist.dataValues.totalSongs = totalSongs;
        artist.dataValues.totalAlbums = totalAlbums;
        res.json(artist);
    } else {
        const err = new Error("Artist not found");
        err.status = 404;
        throw err;
    }
})


// Get playlists of an Artist based on Artist id
router.get('/:artistId/playlists', async (req, res) => {
    const { artistId } = req.params;

    const artist = await User.findByPk(artistId);

    if (artist) {
        const Playlists = await Playlist.findAll({
            where: { userId: artistId }
        })

        res.json({ Playlists });

    } else {
        const err = new Error("Artist not found");
        err.status = 404;
        throw err;
    }
})



module.exports = router;
