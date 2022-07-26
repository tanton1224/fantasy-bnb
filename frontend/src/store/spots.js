import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/loadSpots'
const CREATE_SPOT = 'spots/createSpot'
const LOAD_SPOT = 'spots/loadSpot'

const loadSpots = (spotList) => ({
  type: LOAD_SPOTS,
  spotList,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot,
});

export const getAllSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const spotList = await response.json();
    dispatch(loadSpots(spotList));
  };
};
export const getOneSpot = (spotId) => async dispatch => {
  const res = await fetch(`/api/spot/${spotId}`)

  if (res.ok) {
    const spot = await res.json();
    dispatch(loadSpot(spot))
    return spot
  }
}

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

let newState;

const spotsReducer = (state = {}, action) => {
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
    case LOAD_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot
      return newState;
    default:
      return state;
  };
};

export default spotsReducer
