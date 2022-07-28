import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/loadReviews'

const loadReviews = (reviewList, spotId) => ({
  type: LOAD_REVIEWS,
  reviewList,
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

const reviewsReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_REVIEWS:
      action.reviewList.forEach(review => {
        newState[action.spotId] = action.reviewList
      })
      return newState;
    default:
      return state;
  }
}

export default reviewsReducer;
