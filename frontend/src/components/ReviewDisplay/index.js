import { useSelector } from "react-redux"

function ReviewDisplay ({spotId}) {
  const reviews = useSelector(state => state.reviews.spotId)

  return (
    {reviews.map((review) => (
      <ul>
        <li></li>
      </ul>
    ))}
  )
}
