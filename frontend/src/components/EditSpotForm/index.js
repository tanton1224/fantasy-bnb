import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';
import './EditSpotForm.css'

function EditSpotFormModal({ spot }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-spot-button" onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotFormModal;
