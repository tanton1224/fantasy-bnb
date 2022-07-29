import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getSpotImages } from '../../store/images'
import { getAllSpots } from '../../store/spots'
import './AllSpots.css'

function AllSpots () {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));


  useEffect(() => {
    dispatch(getAllSpots())
    // dispatch(getSpotImages(spot.id)) // come back to this, need to know if placeholders will work for images
  }, [dispatch])

  return (
    <div className='spots-container'>
      {spots.map(spot => {
        return (
          <NavLink key={spot.id} to={`/spots/${spot.id}`}>
            <div className="spot-container">
              <div className="image-container">
                <img src={`https://cdna.artstation.com/p/assets/images/images/012/910/872/large/clayscence-art-lee2-2.jpg?1537148145`} alt="Spot Image" />
              </div>
              <div className='info-container'>
                <div className='top-spot-info-container'>
                  <p style={{fontWeight: "bold"}}>{`${spot.city}, ${spot.state}`}</p><p><i className='fa-solid fa-star'></i>{`${spot.avgStarRating}`} </p>
                </div>
                <p>{`$${spot.price} night`}</p>
              </div>
            </div>
          </NavLink>
        )
      })}
    </div>
  )
}
export default AllSpots;
