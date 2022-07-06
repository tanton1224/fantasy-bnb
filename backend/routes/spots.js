const express = require('express')

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { User, Spot } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');

const router = express.Router();

let err = {}

router.get(
  '/:spotId',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    if (!spotById) {
      err.message = "Spot couldn't be found";
      err.statusCode = 404;
      return res.json(err);
    }

    res.json(spotById)
  }
)

router.put(
  '/:spotId',
  validateSpotCreation,
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    let { address, city, state, country, lat, lng, name, description, price } = req.body

    spotById.address = address
    spotById.city = city
    spotById.state = state
    spotById.country = country
    spotById.lat = lat
    spotById.lng = lng
    spotById.name = name
    spotById.description = description
    spotById.price = price

    res.json(spotById)
  }
)

router.delete(
  '/:spotId',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    spotById.destroy()

    let final = {}
    final.message = "Successfully deleted"
    final.statusCode = 200

    res.json(final)
  }
)


router.post(
  '/',
  validateSpotCreation,
  async (req, res, next) => {
    const newSpot = await Spot.create(req.body)

    if (!newSpot) {
      err.message = "Validation Error";
      err.statusCode = 400
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
