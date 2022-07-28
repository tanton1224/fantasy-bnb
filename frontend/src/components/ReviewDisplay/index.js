import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSpotReviews } from "../../store/reviews";

function ReviewDisplay ({spotId}) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews[spotId])
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    async function getSpotReviews () {
      if (reviews === undefined) {
        const response = await dispatch(getAllSpotReviews(spotId))
        setIsLoaded(true);
      } else {
        setIsLoaded(true)
      }
    }

    getSpotReviews();
  }, [dispatch, reviews])

  console.log("This is reviews", reviews)
  console.log("This is spotId", spotId)

  return (
    <div className="reviews-display">
      {isLoaded && reviews?.map((review) => (
          <div className="review-container">
            <div className="review-name-date">
              {`${review.User.firstName} ${review.User.lastName}`}<i className="fa-solid fa-star"></i>{`${review.stars}`}
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
