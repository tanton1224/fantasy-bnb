const express = require('express')

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { User, Spot } = require('../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../utils/validation');

const router = express.Router();

let errorsObj = {}

router.get(
  '/:spotId',
  restoreUser,
  async (req, res, next) => {
    console.log(req.params)
    const spotId = req.params.spotId

    const spotById = await Spot.findByPk(spotId)

    if (!spotById) {
      errorsObj.message = "Spot couldn't be found"
      errorsObj.statusCode = 404
      return res.json(errorsObj)
    }

    res.json(spotById)
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
