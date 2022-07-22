const express = require('express');
const router = express.Router();

const { Song } = require('../db/models');

// Get All Songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll({
        attributes: ["id", "userId", "albumId", "title", "description", "createdAt", "updatedAt", "previewImage"]
    })
    res.json(songs);
})


module.exports = router;
