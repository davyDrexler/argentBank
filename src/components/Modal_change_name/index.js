import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPseudo } from '../../features/userSlice';
import './styles.css';

const Modal = ({ isOpen, onClose }) => {
  const [newPseudo, setNewPseudo] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserPseudo(newPseudo));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <label>
            New Pseudo:
            <input
              type="text"
              value={newPseudo}
              onChange={(e) => setNewPseudo(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          {status === 'loading' && <p>Loading...</p>}
          {status === 'failed' && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Modal;
