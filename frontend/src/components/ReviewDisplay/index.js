import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { deleteYourReview, getAllSpotReviews } from "../../store/reviews";

function ReviewDisplay ({spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => state.reviews[spotId])
  const user = useSelector(state => state.session.user)
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(getAllSpotReviews(spotId)).then(() => setIsLoaded(true))
  }, [dispatch])

  return isLoaded && (
    <div className="reviews-display">
      {reviews && reviews.map((review) => (
          <div className="review-container">
            <div className="review-name-date">
              {`${review.User.firstName} ${review.User.lastName}`}<i className="fa-solid fa-star"></i>{`${review.stars}`}
            </div>
            <div className="review-content">
              {`${review.reviewContent}`}
            </div>
            {user?.id === review.User.id && (<div className="delete-review-button-container">
              <button className="delete-review-button" onClick={() => {
                dispatch(deleteYourReview(review.id, spotId));
                history.push(`/spots/${spotId}`)
                }}>Delete</button>
            </div>)}
          </div>
      ))}
    </div>
  )
}

export default ReviewDisplay;
