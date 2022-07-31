import { useState } from 'react'
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
      onClick();
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
        <label>Preview Image
          <input
            type="text"
            placeholder={spot.previewImage}
            value={previewImage}
            onChange={e => setPreviewImage(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default EditSpotForm;
