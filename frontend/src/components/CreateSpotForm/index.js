import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css'

function CreateSpotForm () {
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
      price
    };

    let createdSpot = await dispatch(createSpotThunk(payload));
    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`)
    }
  }

  return (
    <section className='create-spot-form-container'>
      <h2>Create your Spot</h2>
      <form className="create-spot-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder='Street'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder='City'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder='State'
          value={state}
          onChange={e => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder='Country'
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder='Place Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{resize: "none"}}
        />
        <input
          type="number"
          placeholder='Price'
          min="1"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default CreateSpotForm;
