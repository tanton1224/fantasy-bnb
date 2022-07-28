import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews'
const CREATE_REVIEW = 'reviews/createReviews'

const loadReviews = (reviewList, spotId) => ({
  type: LOAD_REVIEWS,
  reviewList,
  spotId
})

const createReview = (review, spotId) => ({
  type: CREATE_REVIEW,
  review,
  spotId
})

export const getAllSpotReviews = (spotId) => async dispatch => {
  const response = await fetch(`/api/reviews/spot/${spotId}`)

  if (response.ok) {
    const reviewList = await response.json();
    dispatch(loadReviews(reviewList, spotId))
    return reviewList;
  };
};

export const createOneReview = (payload, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${spotId}`, {
    method: 'POST',
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const review = await res.json();
    dispatch(createReview(review, spotId));
    return review;
  }
}

const reviewsReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_REVIEWS:
      action.reviewList.forEach(review => {
        newState[action.spotId] = action.reviewList
      })
      return newState;
    case CREATE_REVIEW:
      newState = {...state};
      newState[action.spotId].push(action.review)
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
