const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');

const router = express.Router();

let err = {}


router.post(
  '/:spotId/images',
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId
    const { url } = req.body

    const newImage = await Image.create({
      spotId,
      url
    })

    let final = {}
    final.id = newImage.id
    final.imageableId = newImage.spotId
    final.imageableType = "Spot"
    final.url = newImage.url

    res.json(final)
  }
)

router.get(
  '/:spotId',
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    if (!spotById) {
      err.message = "Spot couldn't be found";
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err);
    }

    res.json(spotById)
  }
)

router.put(
  '/:spotId',
  validateSpotCreation,
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    if (!spotById) {
      let err = {}
      err.message = "Spot couldn't be found";
      err.statusCode = 404
      res.statusCode = 404;
      return res.json(err)
    }

    if (req.user.id !== spotById.ownerId) {
      let err = {};
      err.title = "Authorization Error"
      err.message = "This isn't your spot to edit!";
      err.statusCode = 401;
      res.statuscode = 401;
      return res.json(err)
    }

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
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    if (req.user.id !== spotById.ownerId) {
      let err = {};
      err.title = "Authorization Error"
      err.message = "This isn't your spot to delete!";
      err.statusCode = 401;
      res.statuscode = 401;
      return res.json(err)
    }

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
  requireAuth,
  async (req, res, next) => {
    const newSpot = await Spot.create(req.body)

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
