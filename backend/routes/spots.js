const express = require('express')

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { User, Spot } = require('../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');

const router = express.Router();

let err = {}

router.get(
  '/:spotId',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    if (!spotById) {
      err.message = "Spot couldn't be found"
      err.statusCode = 404
      return res.json(err)
    }

    res.json(spotById)
  }
)




router.post(
  '/',
  validateSpotCreation,
  async (req, res, next) => {
    const newSpot = await Spot.create(req.body)

    if (!newSpot) {
      err.statusCode = 400
      err.message = "Validation Error"
      return res.json(err)
    }

    res.json(newSpot)
  }
)

router.get(
  '/',
  async (req, res, next) => {
    const allSpots = await Spot.findAll()

    res.json(allSpots);
  }
)


module.exports = router;
