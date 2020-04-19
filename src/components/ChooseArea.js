import React,{useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {Redirect} from 'react-router-dom';

import './ChooseArea.css';

Modal.setAppElement('#root')

export default function ChooseArea() {
  ///var subtitle;
  const [redirectTo, setRedirectTo] = useState('')
  const [isModalOpen,setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsModalOpen(false);
  }

  const generateTimer = async (isPomodoro = false) => {
    if (isPomodoro !== true) isPomodoro = false; 
    const res = await axios.post('/api/generatetimer', {isPomodoro});
    setRedirectTo(res.data);
  };

  if(redirectTo.length > 0) return <Redirect to={`/${redirectTo}`} />

  return (
    <div className="parent p-5">
      <div className="container">
        <p className="display-3 text-center font-weight-bold text-white">
          YOUR CUSTOM TIMERS
        </p>
        <p className="text-center text-white">Choose A Option:</p>
        <div className="row text-center">
          <div className="col-6">
            <button
              className="btn btn-danger"
              onClick={() => generateTimer(true)}
            >
              POMODORO
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-danger" onClick={openModal}>
              CUSTOM TIMER
            </button>
          </div>
        </div>
      </div>

        <Modal
          isOpen={isModalOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Example Modal"
        >
 
          <h2>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
    </div>
  );
}

const customModalStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};