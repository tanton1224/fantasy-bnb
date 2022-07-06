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
const loginRouter = require('./login')
const signupRouter = require('./signup')
const spotsRouter = require('./spots')
const profileRouter = require('./profile')
const reviewsRouter = require('./reviews')

router.use('/api', apiRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/spots', spotsRouter);
router.use('/profile', profileRouter);
router.use('/reviews', reviewsRouter);


module.exports = router;
