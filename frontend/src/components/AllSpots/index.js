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
  }, [dispatch])

  return (
    <div className='page-container'>
      <div className='spots-container'>
        {spots.map(spot => {
          return (
            <NavLink className="spot-link" key={spot.id} to={`/spots/${spot.id}`}>
              <div className="spot-container">
                <div className="image-container">
                  <img src={`${spot?.previewImage}`} alt="Spot Image" />
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
    </div>
  )
}
export default AllSpots;
