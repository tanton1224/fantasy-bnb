import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSpots } from '../../store/spots'
import './AllSpots.css'

function AllSpots () {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(getAllSpots())
  }, [dispatch])

  return (
    <>
      {spots.map(spot => {
        return (
          <div className="spot-container">
            <div className="image-container">
              <img src="https://static.onecms.io/wp-content/uploads/sites/37/2016/02/15230656/white-modern-house-curved-patio-archway-c0a4a3b3.jpg" alt="Spot Image" />
            </div>
            <div className='info-container'>
              <p>{`${spot.city}, ${spot.state}`} <i className='fa-solid fa-star'></i>{`Review Score goes here`} </p>
              <p>{`$${spot.price} night`}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}
export default AllSpots;
