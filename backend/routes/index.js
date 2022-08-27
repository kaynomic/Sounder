const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const meRouter = require('./me.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const artistsRouter = require('./artists.js');
const commentsRouter = require('./comments.js');
const playlistsRouter = require('./playlists.js');

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
router.use('/playlists', playlistsRouter);

// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

module.exports = router;
