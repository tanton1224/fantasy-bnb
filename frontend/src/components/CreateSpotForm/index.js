import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createSpotThunk } from '../../store/spots';
import './CreateSpotForm.css'

function CreateSpotForm () {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ state, setState ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ errors, setErrors ] = useState([]);

  useEffect(() => {
    const newErrors = [];

    if (address.length <= 0) {
      newErrors.push("Address is required")
    }
    if (city.length <= 0) {
      newErrors.push("City is required")
    }
    if (state.length <= 0) {
      newErrors.push("State is required")
    }
    if (country.length <= 0) {
      newErrors.push("Country is required")
    }
    if (name.length <= 0) {
      newErrors.push("Name is required")
    }
    if (description.length <= 0) {
      newErrors.push("Description is required")
    }
    if (price.length <= 0) {
      newErrors.push("Price is required and must be above zero")
    }

    if (newErrors.length) {
      setErrors(newErrors);
    } else {
      setErrors([])
    }
  }, [address, city, state, country, name, description, price])

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
      setAddress("")
      setCity("")
      setState("")
      setCountry("")
      setName("")
      setDescription("")
      setPrice("")
      history.push("/");
    }
  }

  return (
    <section className='create-spot-form-container'>
      <h2>Create your Spot</h2>
      {errors.length > 0 && (
        <ul className='create-spot-form-errors'>
          {errors.map(error => {
            return <li>{`${error}`}</li>
          })}
        </ul>
      )}
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
        <button type="submit" disabled={errors.length > 0}>Submit</button>
      </form>
    </section>
  )
}

export default CreateSpotForm;
