const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation, validateQueryParameters } = require('../../utils/validation');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const router = express.Router();

let err = {}


router.post(
  '/:spotId/images',
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId
    const { url } = req.body

    const spotById = await Spot.findByPk(spotId)

    if (!spotById) {
      let err = {}
      err.message = "Spot couldn't be found"
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err)
    }

    if (spotById.ownerId !==  req.user.id) {
      let err = {}
      err.message = "This isn't your spot to add ajn image to!"
      err.statusCode = 403;
      res.statusCode = 403;
      return res.json(err)
    }

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

    const spotById = await Spot.findOne({
      where: { id: spotId },
      include: [ { model: User }, { model: Image, attributes: ['url'], where: {
        reviewId: null
      } } ]
    })

    const numReviews = await Review.count({
      where: {
        spotId
      }
    })

    if (!spotById) {
      err.message = "Spot couldn't be found";
      err.statusCode = 404;
      res.statusCode = 404;
      return res.json(err);
    }

    const totalStars = await Review.sum('stars', { where: { spotId } })

    let avgStarRating = totalStars / numReviews

    res.json({
      spotById,
      numReviews,
      avgStarRating
    })
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
    if (lat) {
      spotById.lat = lat
    }
    if (lng) {
      spotById.lng = lng
    }
    spotById.name = name
    spotById.description = description
    spotById.price = price

    await spotById.save();
    res.json(spotById);
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
    const ownerId = req.user.id
    const newSpot = await Spot.create({...req.body, ownerId })

    res.json(newSpot)
  }
)

router.get(
  '/',
  async (req, res, next) => {
    let pagination = {}
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    let errors = {}
    let errorDetector = 0

    if (page && page < 0) {
      errors.page = "Page must be greater than or equal to 0";
      errorDetector++
    }

    if (size && size < 0) {
      errors.size = "Size must be greater than or equal to 0";
      errorDetector++
    }

    if (minLat && minLat < -90 && minLat > 90) {
      errors.minLat = "Minimum latitude is invalid"
      errorDetector++
    }

    if (maxLat && maxLat < -90 && maxLat > 90) {
      errors.maxLat = "Maximum latitude is invalid"
      errorDetector++
    }

    if (minLng && minLng < -180 && minLng > 180) {
      errors.minLng = "Minimum longitude is invalid"
      errorDetector++
    }

    if (maxLng && maxLng < -180 && maxLng > 180) {
      errors.minLng = "Minimum longitude is invalid"
      errorDetector++
    }

    if (minPrice && minPrice < 0) {
      errors.minPrice = "Minimum price muust be greater than 0"
      errorDetector++
    }

    if (maxPrice && maxPrice < 0) {
      errors.maxPrice = "Minimum price muust be greater than 0"
      errorDetector++
    }

    if (errorDetector > 0) {
      let final = {}
      final.message = "Validation Error"
      final.statusCode = 400
      final.errors = errors
      res.statusCode = 400
      res.json(final)
    }

    let where = {}

    if (minLat) {
      where.lat = { [Op.gte]: minLat }
    }

    if (maxLat) {
      where.lat = { [Op.lte]: maxLat }
    }

    if (minLat && maxLat) {
      where.lat = { [Op.gte]: minLat, [Op.lte]: maxLat }
    }

    if (minLng) {
      where.lng = { [Op.gte]: minLng }
    }

    if (maxLng) {
      where.lng = { [Op.lte]: maxLng }
    }

    if (minLng && maxLng) {
      where.lng = { [Op.gte]: minLng, [Op.lte]: maxLng }
    }

    if (minPrice) {
      where.price = { [Op.gte]: minPrice }
    }

    if (maxPrice) {
      where.price = { [Op.lte]: maxPrice }
    }

    if (minPrice && maxPrice) {
      where.price = { [Op.gte]: minPrice, [Op.lte]: maxPrice }
    }


    page = page === undefined ? 0 : parseInt(page); // these handle defaults in the absence of query
    size = size === undefined ? 20 : parseInt(size);

    pagination.limit = size
    pagination.offset = size * page

    const allSpots = await Spot.findAll({
      ...pagination,
      where,
      include: [{model: Review}]
    })

    let result = [];

    // allSpots.forEach(async (spot, i) => {
      // let newSpot;
      // spot = spot.toJSON();
      // let reviewCount = await Review.count({ where: { spotId: spot.id }})
      // let sum = await Review.sum('stars', { where: {spotId: spot.id }})
      // let avgStarRating = sum / reviewCount
      // spot.reviewCount = reviewCount
      // spot.avgStarRating = avgStarRating
      // // newSpot = {...spot}
      // result.push(spot)
      // console.log(i, result)
    // })

    allSpots.forEach((spot, i) => {
      let result = {}
      spot = spot.toJSON()
      let sum = 0;
      let avg = 0;
      let reviews = spot.Reviews
      if (reviews.length) {
        for (let review of reviews) {
          sum += review.stars;
        }
        avg = (sum / reviews.length).toFixed(1);
        spot.numReviews = reviews.length;
        spot.avgStarRating = avg;
        delete spot.Reviews
        result = { ...spot }
        allSpots[i] = result;
      } else {
        spot.numReviews = reviews.length;
        spot.avgStarRating = "0";
        delete spot.Reviews
        result = { ...spot }
        allSpots[i] = result;
      }
    })
    console.log(result)


    res.json(allSpots);
  }
)


module.exports = router;
