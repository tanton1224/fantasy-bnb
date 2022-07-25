const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');
const booking = require('../db/models/booking');

const router = express.Router();


router.delete(
  '/:imageId',
  requireAuth,
  async (req, res, next) => {
    const imageId = req.params.imageId
    const userId = req.user.id

    const image = await Image.findByPk(imageId)

    const spotId = image.spotId

    const spot = await Spot.findByPk(spotId)

    if (!image) {
      let err = {};
      err.message = "Image couldn't be found"
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err)
    }

    if (!spot) {
      let err = {};
      err.message = "Related spot couldn't be found! Something's gone wrong!"
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err)
    }

    if (spot.ownerId !== userId) {
      let err = {}
      err.message = "This isn't your image to delete!"
      err.statusCode = 403;
      res.statusCode = 403;
      return res.json(err)
    }

    image.destroy()

    let final = {}
    final.message = "Successfully deleted"
    final.statusCode = 200;
    res.json(final)
  }
)


module.exports = router;
