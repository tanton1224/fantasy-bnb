import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spots'
import './DeleteSpot.css'

function DeleteSpot ({ spotId, onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onDelete = () => {
    dispatch(deleteSpotThunk(spotId));
    history.push('/')
  }

  return (
    <div className='delete-spot-modal'>
      <h2>Do you really want to delete this spot?</h2>
      <h3>This cannot be undone.</h3>
      <div className='delete-buttons-container'>
        <button className="yes-delete-button" onClick={onDelete}>Yes</button>
        <button className="no-delete-button" onClick={onClick}>No</button>
      </div>
    </div>
  )
}

export default DeleteSpot;
