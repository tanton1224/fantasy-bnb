import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from '../../store/selectedSpot'
import { getSpotImages } from '../../store/images'
import EditSpotForm from "../EditSpotForm";
import DeleteSpotModal from "../DeleteSpotModal";

function SpotDetails () {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const today = new Date();
  const [ showEditForm, setShowEditForm ] = useState(false)

  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getSpotImages(spotId))
  }, [dispatch])

  const spot = useSelector(state => state.spots[spotId])
  const detailedSpot = useSelector(state => state.selectedSpot.spotById)
  const spotImages = useSelector(state => state.images[spotId])
  const user = useSelector(state => state.session.user)

  return (
    <>
    {spot && (
      <>
      <div className="title-div">
        <h1>{spot?.name}</h1>
      </div>
      <div className="info-div">
        <span><i className="fa-solid fa-star"></i>{`${spot?.avgStarRating}`}</span>
        <button>{`${spot?.numReviews} reviews`}</button>
        <span>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</span>
      </div>
      </>
    )}
    {spotImages && (
      <div className="image-div">
        {spotImages?.map(image => (
          <img src={`https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=20&m=155666671&s=612x612&w=0&h=sL5gRpVmrGcZBVu5jEjF5Ne7A4ZrBCuh5d6DpRv3mps=`} alt="There should be an image here!"/>
        ))}
      </div>
    )}
    {user?.id === spot?.ownerId && (
      <div className="owned-spot-<p></p>uttons">
        <button onClick={() => setShowEditForm(!showEditForm)}>Edit Spot</button>
        <DeleteSpotModal spotId={spot.id}/>
      </div>
    )}
    {showEditForm && <EditSpotForm spot={spot} hideForm={() => setShowEditForm(false)} />}
    {spot && (
      <div className="column-container">
        <div className="left-column">
          <h2>{`${spot?.name} hosted by ${detailedSpot?.User.firstName} ${detailedSpot?.User.lastName}`}</h2>
          <p>{spot?.description}</p>
        </div>
        <div className="booking-creator-container">
          <div className="booking-creator-info-holder">
            <div className="booking-creator-main-info">
              <span>
                <span className="booking-creator-price">{`$${spot.price} `}</span>
                <span className="booking-creator-night">night</span>
              </span>
              <span>
                <i className="fa-solid fa-star"></i>
                <span className="booking-creator-review-score">{`${spot.avgStarRating} -`}</span>
                <span className="booking-creator-review-count">{`${spot.numReviews} reviews`}</span>
              </span>
            </div>
            <div className="booking-creator-form-container">
              <form className="booking-creator-form">
                <label>Check-In
                  <input
                    type="text"
                    placeholder={`${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`}
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default SpotDetails;
