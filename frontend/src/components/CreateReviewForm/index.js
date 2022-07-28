import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOneReview } from "../../store/reviews";
import './CreateReviewForm.css'

function CreateReviewForm ({ spotId }) {
  const dispatch = useDispatch();
  const [ review, setReview ] = useState('');
  const [ stars, setStars ] = useState('')

  const onSubmit = async (e) => {
    const payload = {
      review,
      stars
    }

    await dispatch(createOneReview(payload, spotId))
  }

  return (
    <div className="review-form-container">
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
          value={stars}
          onChange={e => setStars(e.target.value)}
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default CreateReviewForm;
