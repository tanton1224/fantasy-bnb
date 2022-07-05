const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const { User, Spot } = require('../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const router = express.Router();


router.get(
  '/spots',
  requireAuth,
  async (req, res, next) => {
    const id = req.user.id

    const ownedSpots = await Spot.findAll({
      where: { id }
    })

    res.json(ownedSpots)
  }
)

router.get(
  '/',
  requireAuth,
  async (req, res, next) => {
    res.json(req.user)
  }
)

module.exports = router;
