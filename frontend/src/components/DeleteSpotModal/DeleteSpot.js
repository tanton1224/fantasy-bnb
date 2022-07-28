import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spots'

function DeleteSpot ({ spotId, onClick }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onDelete = () => {
    dispatch(deleteSpotThunk(spotId));
    history.push('/')
  }

  return (
    <>
    <h2>Do you really want to delete this spot?</h2>
    <h3>This cannot be undone.</h3>
    <button onClick={onDelete}>Yes</button>
    <button onClick={onClick}>No</button>
    </>
  )
}

export default DeleteSpot;
