import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editSpotThunk } from '../../store/spots'; // gotta make this
import './EditSpotForm.css'

function EditSpotForm ({ spot }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ address, setAddress ] = useState('')
  const [ city, setCity ] = useState('')
  const [ state, setState ] = useState('')
  const [ country, setCountry ] = useState('')
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ price, setPrice ] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      spotId: spot.id,
    };

    let editedSpot = await dispatch(editSpotThunk(payload));
    if (editedSpot) {
      history.push(`/spots/${editedSpot.id}`)
    }
  }

  return (
    <section className='edit-spot-form-container'>
      <h2>Edit your Spot</h2>
      <form className="edit-spot-form" onSubmit={onSubmit}>
        <label>Street address
          <input
            type="text"
            placeholder={spot.address}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <label>City
          <input
            type="text"
            placeholder={spot.city}
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>
        <label>State
          <input
            type="text"
            placeholder={spot.state}
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </label>
        <label>Country
          <input
            type="text"
            placeholder={spot.country}
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </label>Name
        <label>
          <input
            type="text"
            placeholder={spot.name}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>Description
          <textarea
            placeholder={spot.description}
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{resize: "none"}}
          />
        </label>
        <label>Price
          <input
            type="number"
            placeholder={spot.price}
            min="1"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default EditSpotForm;
