const express = require('express')

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');

const router = express.Router();


router.get(
  '/spot/:spotId',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const allSpotReviews = await Review.findAll({
      where: {
        spotId,
      },
      include: [
        { model: User },
        { model: Image }
      ]
    })

    res.json(allSpotReviews)
  }
)

router.post(
  '/spot/:spotId',
  restoreUser,
  async (req, res, next) => {
    console.log(req.user)
    const { review, stars } = req.body;
    const spotId = req.params.spotId;
    const numberSpotId = Number(spotId)
    let userId = req.user.id;

    let newReview = await Review.create({
      spotId: numberSpotId,
      stars,
      reviewContent: `${review}`,
      userId,
    });

    res.json(newReview);
  }
)


module.exports = router;
