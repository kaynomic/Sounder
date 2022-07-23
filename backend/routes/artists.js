const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser, setTokenCookie } = require("../utils/auth.js");
const { Album, User, Song } = require('../db/models');

/* ---------------------- GET ----------------------- */

// Get all albums of an Artist based on the Artist's id
router.get('/:artistId/albums', async (req, res) => {
    const { artistId } = req.params;

    const artist = await User.findByPk(artistId);

    if (artist) {
        const Albums = await Album.findAll({
            where: { userId: artistId },
            attributes: [
                "id", "userId", "title", "description", "createdAt", "updatedAt", "previewImage"
            ]
        });

        res.json({ Albums });

    } else {
        const err = new Error("Artist not found");
        err.status = 404;
        throw err;
    }
})







module.exports = router;
