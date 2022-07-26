import { csrfFetch } from "./csrf";

const LOAD_IMAGES = 'images/loadImages'

const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images,
  spotId
})

export const getSpotImages = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)

  if (response.ok) {
    const spotData = await response.json()
    const images = spotData.images
    dispatch(loadImages(images, spotId))
    return images;
  }
}

let newState;

const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      newState = {...state}
      newState[action.spotId] = action.images
      return newState;
  }
}

export default imagesReducer;
