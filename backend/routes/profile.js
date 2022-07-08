const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');
const { route } = require('./api');

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
  '/reviews',
  requireAuth,
  async (req, res, next) => {
    const userId = req.user.id

    const ownedReviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: { exclude: ['username', 'createdAt', 'updatedAt', 'hashedPassword'] }
        },
        {
          model: Spot,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: Image,
          attributes: ['url']
        }
      ]
    })

    res.json(ownedReviews)
  }
)

router.get(
  '/bookings',
  requireAuth,
  async (req, res, next) => {
    const userId = req.user.id;

    const ownedBookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Spot,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
      ]
    })

    res.json(ownedBookings)
  }
)

router.get(
  '/',
  requireAuth,
  async (req, res, next) => {
    let profile = {}
    profile.id = req.user.id
    profile.username = req.user.username
    profile.firstName = req.user.firstName
    profile.lastName = req.user.lastName
    profile.email = req.user.email

    res.json(profile)
  }
)

module.exports = router;
