import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOneReview } from "../../store/reviews";
import './CreateReviewForm.css'

function CreateReviewForm ({ spotId, reviews }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ review, setReview ] = useState('');
  const [ stars, setStars ] = useState(0)
  const [ errors, setErrors ] = useState([])
  const [ hasErrors, setHasErrors ] = useState(false)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    const newErrors = []

    if (!reviews) return; // catch before rendering state

    if (review.length < 5) {
      newErrors.push("Please write more for your review")
    }

    if (stars > 5 || stars < 1) {
      newErrors.push("Stars must be between 1 and 5")
    }

    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([])
    }

  }, [review, stars])


  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    const payload = {
      review,
      stars
    }

    reviews.forEach(review => {
      if (review.userId === user.id) {
        newErrors.push("You have already reviewed this spot!")
        console.log(newErrors)
      }
    })

    if (newErrors.length > 0) {
      setErrors(newErrors)
    } else {
      let newReview = dispatch(createOneReview(payload, spotId))
      if (newReview) {
        history.push(`/spots/${spotId}`)
      }
    }
  }

  return (
    <div className="review-form-container">
      {errors.length > 0 && (<ul className="review-form-errors">
        {errors.map(error => {
          return <li>{`${error}`}</li>
        })}
      </ul>)}
      <form className="review-form"
        onSubmit={onSubmit}
      >
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={e => setReview(e.target.value)}
          style={{resize: "none"}}
        />
        <input
          type="number"
          placeholder="How many stars out of 5?"
          min="1"
          max="5"
          value={stars}
          onChange={e => setStars(e.target.value)}
        />
        <button type="submit" disabled={errors.length > 0}>Submit Review</button>
      </form>
    </div>
  )
}

export default CreateReviewForm;
