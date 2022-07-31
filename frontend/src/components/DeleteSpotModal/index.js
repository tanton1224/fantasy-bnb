import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSpot from './DeleteSpot';
import './DeleteSpot.css'

function DeleteSpotModal({ spotId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-spot-button" onClick={() => setShowModal(true)}>Delete Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSpot spotId={spotId} onClick={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default DeleteSpotModal;
