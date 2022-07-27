import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/updateSpot'

const loadSpots = (spotList) => ({
  type: LOAD_SPOTS,
  spotList,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const loadSpot = (spot) => ({
  type: LOAD_SPOTS,
  spot,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

export const getAllSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const spotList = await response.json();
    dispatch(loadSpots(spotList));
  };
};

export const createSpotThunk = (payload) => async dispatch => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    dispatch(createSpot(payload));
    let data = res.json()
    return data
  }
}

export const editSpotThunk = (payload, spotId) => async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const spot = await res.json();
    dispatch(updateSpot(spot))
    return spot
  }
}


const spotsReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case LOAD_SPOTS:
      newState = {...state};
      action.spotList.forEach(spot => {
        newState[spot.id] = spot;
      });
      return newState;
    case CREATE_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot
      return newState;
    case UPDATE_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot
      return newState;
    default:
      return state;
  };
};

export default spotsReducer
