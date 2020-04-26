import React, {useState} from 'react';
import axios from '../config/axios';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';

import './ChooseArea.css';

Modal.setAppElement('#root');

export default function ChooseArea() {
  const [redirectTo, setRedirectTo] = useState('');
  const [manualWorkTime, setManualWorkTime] = useState('');
  const [manualBreakTime, setManualBreakTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const generateTimer = async (isPomodoro) => {
    closeModal();
        
    const res = await axios.post('/api/generatetimer', {
      manualWorkTime,
      manualBreakTime,
    });
    setRedirectTo(res.data);
  };

  if (redirectTo.length > 0) return <Redirect to={`/${redirectTo}`} />;
  /* if (redirectTo.length > 0) return <Redirect to={`/justimer-client/${redirectTo}`} />; */

  return (
    <div className="parent">
      {/* <h1 className="text-center">TIMER</h1> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="row">
        <div className="col-6 pomodoro-section pt-5">
          <p className="text-center pt-5">
            <a onClick={() => generateTimer(true)}>POMODORO</a>
          </p>
        </div>
        <div className="col-6 custom-section pt-5">
          <p className="text-center pt-5">
            <a onClick={openModal}>CUSTOM</a>
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Example Modal"
      >
        <h2>Custom Timer Settings</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Work Time (min)"
              value={manualWorkTime}
              onChange={(e) => setManualWorkTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Break Time (min)"
              value={manualBreakTime}
              onChange={(e) => setManualBreakTime(e.target.value)}
              required
            />
          </div>
          <div className="text-right">
          <button className="btn btn-primary" onClick={generateTimer}>
            Generate Timer!
          </button>
          </div>
        </form>

        
     
      </Modal>
    </div>
  );
}

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
