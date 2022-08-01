import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from '../../store/selectedSpot';
import { getSpotImages } from '../../store/images';
import EditSpotFormModal from "../EditSpotForm";
import DeleteSpotModal from "../DeleteSpotModal";
import { getAllSpotReviews } from "../../store/reviews";
import ReviewDisplay from "../ReviewDisplay";
import CreateReviewForm from "../CreateReviewForm";
import './SpotDetails.css'

function SpotDetails () {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const today = new Date();
  const [ showEditForm, setShowEditForm ] = useState(false)

  useEffect(() => {
    dispatch(getOneSpot(spotId));
    dispatch(getSpotImages(spotId));
    dispatch(getAllSpotReviews(spotId));
  }, [dispatch])

  const spot = useSelector(state => state.spots[spotId])
  const extraSpotInfo = useSelector(state => state.selectedSpot)
  const detailedSpot = useSelector(state => state.selectedSpot.spotById)
  const spotImages = useSelector(state => state.images[spotId])
  const user = useSelector(state => state.session.user)
  const reviews = useSelector(state => state.reviews[spotId])

  return (
    <div className="spot-details-container">
      {spot && (
        <>
        <div className="title-div">
          <h1>{spot?.name}</h1>
        </div>
        <div className="info-div">
          <span><i className="fa-solid fa-star"></i>{`${extraSpotInfo?.avgStarRating.toFixed(2)}  •`}</span>
          <span>{`${extraSpotInfo?.numReviews} reviews  •`}</span>
          <span>{`${spot?.city}, ${spot?.state}, ${spot?.country}`}</span>
        </div>
        </>
      )}
      <div className="all-spot-images-container">
        <div className="big-spot-image-container">
          <img src={`${spot?.previewImage}`} alt="Something's gone wrong! Probably a bad URL! " />
        </div>
        <div className="small-images-container">
          {spotImages && spotImages?.map((image, i) => (
            <div className="small-spot-image-div">
              <img className={`small-img-${i}`} src={`${image.url}`} alt="There should be an image here!"/>
            </div>
          ))}
        </div>
      </div>
      {user?.id === spot?.ownerId && (
        <div className="owned-spot-buttons">
          <EditSpotFormModal spot={spot} />
          <DeleteSpotModal spotId={spot?.id}/>
        </div>
      )}
      {spot && (
        <div className="column-container">
          <div className="left-column">
            <h2>{`${spot?.name} hosted by ${detailedSpot?.User.firstName} ${detailedSpot?.User.lastName}`}</h2>
            <p className="spot-description">{spot?.description}</p>
            <div className="spot-reviews-container">
              <ReviewDisplay spotId={spotId} extraSpotInfo={extraSpotInfo} />
              <CreateReviewForm spotId={spotId} reviews={reviews} />
            </div>
          </div>
          <div className="booking-sample-container">
              <div className="booking-sample-main-info">
                <span className="booking-sample-ppn">
                  <span className="booking-sample-price">{`$${spot.price}`}</span>
                  <span className="booking-sample-night">night</span>
                </span>
                <span>
                  <i className="fa-solid fa-star"></i>
                  <span className="booking-sample-review-score">{extraSpotInfo.avgStarRating === null ? "No Reviews Yet • " : `${extraSpotInfo.avgStarRating} •`}</span>
                  <span className="booking-sample-review-count">{`${extraSpotInfo.numReviews} reviews`}</span>
                </span>
              </div>
              <div className="booking-sample-message">
                  You won't be charged yet.
              </div>
              <div className="booking-sample-price-info">
                <span style={{textDecoration: "underline"}}>{`$${spot.price} x 3 nights`}</span>
                <span>{`$${spot.price * 3}`}</span>
              </div>
              <div className="booking-sample-clean-fee">
                <span style={{textDecoration: "underline"}}>Cleaning Fee</span>
                <span>$30</span>
              </div>
              <div className="booking-sample-service-fee">
                <span style={{textDecoration: "underline"}}>Service Fee</span>
                <span>$50</span>
              </div>
              <div className="booking-sample-total">
                <span style={{fontWeight: "bold", fontSize: "large"}}>Total before tax</span>
                <span style={{fontWeight: "bold", fontSize: "large"}}>{`$${(spot.price * 3) + 80}`}</span>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpotDetails;
