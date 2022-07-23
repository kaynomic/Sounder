const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const meRouter = require('./me.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const artistsRouter = require('./artists.js');
const commentsRouter = require('./comments.js');

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.use('/api', apiRouter);
router.use('/me', meRouter);
router.use('/songs', songsRouter);
router.use('/albums', albumsRouter);
router.use('/artists', artistsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
