const { check, validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const validateSpotCreation = [
  check('address')
    .notEmpty()
    .withMessage("Address is required"),
  check('city')
    .notEmpty()
    .withMessage("City is required"),
  check('state')
    .notEmpty()
    .withMessage("State is required"),
  check('country')
    .notEmpty()
    .withMessage("Country is required"),
  check('lat')
    .isNumeric()
    .withMessage("Latitude is not valid"),
  check('lng')
    .isNumeric()
    .withMessage("Longitude is not valid"),
  check('name')
    .isLength({min: 1, max: 50})
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .notEmpty()
    .withMessage("Description is required"),
  check('price')
    .notEmpty()
    .withMessage("Price per day is required"),
  handleValidationErrors
]

module.exports = {
  handleValidationErrors,
  validateSpotCreation
};
