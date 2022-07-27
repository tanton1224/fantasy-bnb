import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from '../../store/spots'
import { getSpotImages } from '../../store/images'

function SpotDetails () {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots[spotId])
  const spotImages = useSelector(state => state.images[spotId])
  console.log(spot)
  console.log(spotImages)


  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getSpotImages(spotId))
  }, [dispatch])

  return (
    <>
    {console.log("This is spot images", spotImages)}
    <div className="title-div">
      <h1>{spot.name}</h1>
    </div>
    <div className="info-div">
      <span><i className="fa-solid fa-star"></i>{`${spot.avgStarRating}`}</span>
      <button>{`${spot.numReviews} reviews`}</button>
      <span>{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
    </div>
    <div className="image-div">
      {spotImages.map(image => {
        <img src={`${image}`} alt="There should be an image here!"/>
      })}
    </div>

    </>
  )
}

export default SpotDetails;
