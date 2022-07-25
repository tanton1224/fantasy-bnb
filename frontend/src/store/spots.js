const LOAD_SPOTS = 'spots/loadSpots'


const loadSpots = (spotList) => ({
  type: LOAD_SPOTS,
  spotList
})

export const getAllSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const spotList = await response.json();
    console.log("Spot list: ", spotList)
    dispatch(loadSpots(spotList))
  }
}


const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spots = {...state};
      action.spotList.forEach(spot => {
        spots[spot.id] = spot
      });
      console.log(spots)
      return spots;
    default:
      return state;
  }
}

export default spotsReducer
