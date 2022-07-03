const express = require('express');
const router = express.Router();

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

const apiRouter = require('./api');
const loginRouter = require('./login')
const signupRouter = require('./signup')
const spotsRouter = require('./spots')

router.use('/api', apiRouter);

router.use('/login', loginRouter);

router.use('/signup', signupRouter);

router.use('/spots', spotsRouter);


module.exports = router;
