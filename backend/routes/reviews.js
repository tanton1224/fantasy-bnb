const express = require('express')

const { setTokenCookie, restoreUser } = require('../utils/auth');
const { User, Spot, Review, Image, Booking } = require('../db/models');
const { check, validationResult, Result } = require('express-validator');
const { handleValidationErrors, validateSpotCreation } = require('../utils/validation');

const router = express.Router();
