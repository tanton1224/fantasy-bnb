import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpotReviews } from "../../store/reviews";

function ReviewDisplay ({spotId}) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.spotId)
  const user = reviews?.User

  useEffect(() => {
    dispatch(getAllSpotReviews(spotId))
  }, [dispatch])

  return (
    <div className="reviews-display">
      {reviews && user && reviews.map((review) => (
          <div className="review-container">
            <div className="review-name-date">
              {`${user.firstName} ${user.lastName}`}<i className="fa-solid fa-star"></i>{`${review.stars}`}
            </div>
            <div className="review-content">
              {`${review.reviewContent}`}
            </div>
          </div>
      ))}
    </div>
  )
}

export default ReviewDisplay;
