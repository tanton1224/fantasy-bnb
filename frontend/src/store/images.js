import { csrfFetch } from "./csrf";

const LOAD_IMAGES = 'images/loadImages'

const loadImages = (images, spotId) => ({
  type: LOAD_IMAGES,
  images,
  spotId
})

export const getSpotImages = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)

  console.log("Is the response ok?", response.ok)

  if (response.ok) {
    const spotData = await response.json()
    const images = spotData.spotById.Images
    dispatch(loadImages(images, spotId))
    return images;
  }
}


const imagesReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_IMAGES:
      newState = {...state}
      newState[action.spotId] = action.images
      return newState;
    default:
      return state;
  }
}

export default imagesReducer;
