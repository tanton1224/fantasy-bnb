const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');
const booking = require('../db/models/booking');

const router = express.Router();


router.post(
  '/spot/:spotId',
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id
    let { startDate, endDate } = req.body

    const numberSpotId = Number(spotId)

    startDate = new Date(startDate)
    endDate = new Date(endDate)

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      let err = {}
      err.message = "Spot couldn't be found";
      err.statusCode = 404;
      res.statusCode = 404;
      res.json(err);
    }

    if (spot.userId == req.user.id) { // check if belongs to Current User
      let err = {};
      err.message = "Cannot book at your own spot"
      err.statusCode = 403;
      res.statusCode = 403;
      res.json(err)
    }

    const allBookings = await Booking.findAll({
      where: {
        spotId,
      }
    })

    let bookingConflict = {}
    bookingConflict.errors = {}

    allBookings.forEach((booking) => { // checks all currently present bookings
      if (startDate >= booking.startDate && startDate <= booking.endDate) { // if startdate is between this bookings start and end add error
        bookingConflict.errors.startDate = "Start date conflicts with an existing booking"
        console.log("Made it inside one of the if's")
      }
      if (endDate >= booking.startDate && endDate <= booking.endDate) { //if enddate is between this bookings start and end add different error
        bookingConflict.errors.endDate = "End date conflicts with an existing booking"
        console.log("Made it inside one of the if's")
      }
      if (startDate < booking.startDate && endDate > booking.endDate) { // if attempted booking completely overlaps the booking
        bookingConflict.errors.bothDates = "This completely overlaps someone elses booking! Don't be greedy!"
      }
    })

    if (bookingConflict.errors.startDate || bookingConflict.errors.endDate || bookingConflict.errors.bothDates) {
      bookingConflict.message = "Sorry, this spot is already booked for some of the specified dates"
      bookingConflict.statusCode = 403;
      res.statusCode = 403;
      return res.json(bookingConflict)
    }

    const newBooking = await Booking.create({
      spotId: numberSpotId,
      startDate,
      endDate,
      userId
    })

    res.json(newBooking)
  }
)

router.put(
  '/:bookingId',
  requireAuth,
  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    let { startDate, endDate } = req.body

    const bookingById = await Booking.findByPk(bookingId);

    const spotId = bookingById.spotId

    if (!booking) { // if booking doesn't exist
      let err = {};
      err.message = "Booking couldn't be found"
      err.statusCode = 404;
      res.statusCode = 404;
      res.json(err)
    }

    if (req.user.id !== bookingById.userId) { // must belong to user in order to edit
      let err = {}
      err.message = "This isn't your booking to edit!";
      err.statusCode = 403;
      res.statusCode = 403;
      res.json(err)
    }

    const allBookings = await Booking.findAll({
      where: {
        spotId,
      }
    })

    let bookingConflict = {}
    bookingConflict.errors = {}

    allBookings.forEach((booking) => { // checks all currently present bookings
      if (startDate >= booking.startDate && startDate <= booking.endDate) { // if startdate is between this bookings start and end add error
        bookingConflict.errors.startDate = "Start date conflicts with an existing booking"
        console.log("Made it inside one of the if's")
      }
      if (endDate >= booking.startDate && endDate <= booking.endDate) { //if enddate is between this bookings start and end add different error
        bookingConflict.errors.endDate = "End date conflicts with an existing booking"
        console.log("Made it inside one of the if's")
      }
      if (startDate < booking.startDate && endDate > booking.endDate) { // if attempted booking completely overlaps the booking
        bookingConflict.errors.bothDates = "This completely overlaps someone elses booking! Don't be greedy!"
      }
    })

    if (bookingConflict.errors.startDate || bookingConflict.errors.endDate || bookingConflict.errors.bothDates) {
      bookingConflict.message = "Sorry, this spot is already booked for some of the specified dates"
      bookingConflict.statusCode = 403;
      res.statusCode = 403;
      return res.json(bookingConflict)
    }

    bookingById.startDate = startDate;
    bookingById.endDate = endDate;

    res.json(bookingById);
  }
)

router.delete(
  '/:bookingId',
  requireAuth,
  async (req, res, next) => {
    const bookingId = req.params.bookingId

    const deadBooking = await Booking.findByPk(bookingId);

    if (!deadBooking) {
      let err = {};
      err.message = "Booking couldn't be found"
      err.statusCode = 404;
      res.statusCode = 404;
      res.json(err)
    }

    if (deadBooking.userId !== req.user.id) {
      let err = {};
      err.message = "This isn't your booking to delete!"
      err.statusCode = 403;
      res.statusCode = 403;
      res.json(err);
    }

    deadBooking.destroy()

    let final = {}
    final.message = "Successfully deleted"
    final.statusCode = 200
    res.json(final)
  }
)


module.exports = router;
