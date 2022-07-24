const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.use(restoreUser);


const apiRouter = require('./api');
const loginRouter = require('./login');
const signupRouter = require('./signup');
const spotsRouter = require('./spots');
const profileRouter = require('./profile');
const reviewsRouter = require('./reviews');
const bookingsRouter = require('./bookings');
const imagesRouter = require('./images');

router.use('/api', apiRouter);

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

if (process.env.NODE_ENV !== 'production') {
  router.get('/api/csrf/restore', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    return res.json({});
  });
}

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/spots', spotsRouter);
router.use('/profile', profileRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/images', imagesRouter);


module.exports = router;
