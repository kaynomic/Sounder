import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AlbumEdit from './AlbumEdit';
import "./AlbumEditForm.css"

function AlbumEditModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Album</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AlbumEdit setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AlbumEditModal;