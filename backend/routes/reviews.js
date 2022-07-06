const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateReview } = require('../utils/validation');

const router = express.Router();


router.get(
  '/spot/:spotId',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      let err = {}
      err.message = "Spot couldn't be found"
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err)
    }

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
  validateReview,
  requireAuth,
  async (req, res, next) => {
    console.log(req.user)
    const { review, stars } = req.body;
    const spotId = req.params.spotId;
    const numberSpotId = Number(spotId);
    let userId = req.user.id;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
      let err = {};
      err.message = "Spot couldn't be found";
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err)
    }

    const reviewedAlready = await Review.findAll({
      where: { userId }
    })

    if (reviewedAlready) {
      let err = {};
      err.message = "User already has a review for this spot";
      err.statusCode = 403;
      res.statusCode = 403;
      return res.json(err)
    }

    let newReview = await Review.create({
      spotId: numberSpotId,
      stars,
      reviewContent: `${review}`,
      userId,
    });

    res.json(newReview);
  }
)

router.put(
  '/:reviewId',
  validateReview,
  requireAuth,
  async (req, res, next) => {
    const reviewId = req.params.reviewId

    const reviewById = await Review.findByPk(reviewId);

    if (!reviewById) {
      err.message = "Review couldn't be found";
      err.statusCode = 404
      res.statusCode = 404;
      return res.json(err)
    }

    if (req.user.id !== reviewById.userId) {
      let err = {};
      err.title = "Authorization Error"
      err.message = "This isn't your review to edit!";
      err.statusCode = 401;
      res.statuscode = 401;
      return res.json(err)
    }

    let { review, stars } = req.body

    reviewById.reviewContent = review
    reviewById.stars = stars

    res.json(reviewById)
  }
)

router.delete(
  '/:reviewId',
  requireAuth,
  async (req, res, next) => {
    const reviewId = req.params.reviewId;

    const reviewById = await Review.findByPk(reviewId);

    if (!reviewById) {
      err.message = "Review couldn't be found";
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err)
    }

    if (req.user.id !== reviewById.userId) {
      let err = {};
      err.title = "Authorization Error"
      err.message = "This isn't your review to delete!";
      err.statusCode = 401;
      res.statuscode = 401;
      return res.json(err)
    }

    reviewById.destroy();

    let final = {}
    final.message = "Successfully deleted"
    final.statusCode = 200;
    res.json(final)
  }
)


module.exports = router;
