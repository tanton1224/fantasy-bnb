import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { editSpotThunk } from '../../store/spots'; // gotta make this
import './EditSpotForm.css'

function EditSpotForm ({ spot, onClick }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ address, setAddress ] = useState(spot.address);
  const [ city, setCity ] = useState(spot.city);
  const [ state, setState ] = useState(spot.state);
  const [ country, setCountry ] = useState(spot.country);
  const [ name, setName ] = useState(spot.name);
  const [ description, setDescription ] = useState(spot.description);
  const [ price, setPrice ] = useState(spot.price);
  const [ previewImage, setPreviewImage ] = useState(spot.previewImage);
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
      price,
      previewImage,
    };

    let editedSpot = await dispatch(editSpotThunk(payload, spot.id));
    if (editedSpot) {
      history.push(`/spots/${editedSpot.id}`)
      onClick(); // close the modal
    }
  }

  return (
    <section className='edit-spot-form-container'>
      <h2>Edit your Spot</h2>
      <form className="edit-spot-form" onSubmit={onSubmit}>
        <label>Address
          <input
            type="text"
            placeholder={"Street Address"}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </label>
        <label>City
          <input
            type="text"
            placeholder={"City"}
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>
        <label>State
          <input
            type="text"
            placeholder={"State"}
            value={state}
            onChange={e => setState(e.target.value)}
          />
        </label>
        <label>Country
          <input
            type="text"
            placeholder={"Country"}
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </label>
        <label>Name
          <input
            type="text"
            placeholder={"Name"}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>Description
          <textarea
            placeholder={"Description"}
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{resize: "none"}}
          />
        </label>
        <label>Price
          <input
            type="number"
            placeholder={"Price"}
            min="1"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </label>
        <label>Preview Image URL
          <input
            type="text"
            placeholder={"Preview Image URL"}
            value={previewImage}
            onChange={e => setPreviewImage(e.target.value)}
          />
        </label>
          {errors.length > 0 && (
            <ul className='create-spot-form-errors'>
              {errors.map(error => {
                return <li>{`${error}`}</li>
              })}
            </ul>
          )}
        <button className='edit-spot-submit-button' type="submit">Submit</button>
      </form>
    </section>
  )
}

export default EditSpotForm;
