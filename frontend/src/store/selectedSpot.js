import { csrfFetch } from "./csrf"

const LOAD_SPOT = 'selectedSpot/loadSpot'

const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot,
})


export const getOneSpot = (spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`)

  if (res.ok) {
    const spot = await res.json()
    dispatch(loadSpot(spot))
    return spot
  }
}

const selectedSpotReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_SPOT:
      newState = action.spot;
      return newState;    
    default:
      return state;
  }
}

export default selectedSpotReducer;
