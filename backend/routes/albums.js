const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser, setTokenCookie } = require("../utils/auth.js");
const { Album, User, Song } = require('../db/models');

/* ---------------------- GET ----------------------- */

// Get All Albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll({
        attributes: [
            "id", "userId", "title", "description", "createdAt", "updatedAt", "previewImage"
        ]
    })
    res.json(albums);
})

// Get details of an Album from an id
router.get('/:albumId', async (req, res) => {
    const { albumId } = req.params;

    const album = await Album.findByPk(albumId, {
        include: [
        {
            model: User,
            as: "Artist",
            attributes: ["id", "username", "previewImage"]
        },
        {
            model: Song,
            attributes: [
                "id", "userId", "albumId", "title", "description", "url", "createdAt", "updatedAt", "previewImage"
            ]
        }
    ]
    })

    if (!album) {
        const err = new Error("Album not found");
        err.status = 404;
        throw err;
    }

    res.json(album);
})

/* ---------------------- POST ----------------------- */

// Create an Album
router.post('/', requireAuth, async (req, res) => {
    const { user } = req;
    const { title, description, imageUrl } = req.body;

    const album = await Album.create({
        userId: user.id,
        title,
        description,
        previewImage: imageUrl
    })
    res.json(album);
})

// Create a Song for an Album based on Album's Id
router.post('/:albumId/songs', requireAuth, async (req, res) => {
    const { user } = req;
    const { albumId } = req.params;
    const { title, description, url, imageUrl } = req.body;

    const album = await Album.findByPk(albumId);

    if (album) {
        if (album.userId === user.id) {
            const song = await Song.create({
                title,
                description,
                url,
                previewImage: imageUrl,
                userId: user.id,
                albumId
            })

            res.json(song);
        }
    } else {
        const err = new Error("Album not found");
        err.status = 404;
        throw err;
    }
})

/* ---------------------- PUT ----------------------- */

// Edit an album
router.put('/:albumId', requireAuth, async (req, res) => {
    const { user } = req;
    const { albumId } = req.params;
    const { title, description, previewImage } = req.body;

    const album = await Album.findByPk(albumId);

    if (album) {
        if (album.userId === user.id) {
            await album.update({
                title,
                description,
                previewImage
            })
        }

        res.json(album);

    } else {
        const err = new Error("Album not found");
        err.status = 404;
        throw err;
    }
})

/* ---------------------- DELETE ----------------------- */

// Delete an album
router.delete('/:albumId', requireAuth, async(req, res) => {
    const { albumId } = req.params;

    const album = await Album.findByPk(albumId);

    if (album) {
        album.destroy();

        res.json({ msg: "Successfully deleted album", statusCode: 200 })
    } else {
        const err = new Error("Album not found");
        err.status = 404;
        throw err;
    }
})


module.exports = router;
