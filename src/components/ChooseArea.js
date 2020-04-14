import React,{useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

import './ChooseArea.css';

export default function ChooseArea() {
  const [redirectTo, setRedirectTo] = useState('')

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
          <div className="col-4">
            <button
              className="btn btn-danger"
              onClick={() => generateTimer(true)}
            >
              POMODORO
            </button>
          </div>
          <div className="col-4">
            <button className="btn btn-danger" onClick={generateTimer}>
              CUSTOM TIMER
            </button>
          </div>
          <div className="col-4">
            <button className="btn btn-danger" onClick={generateTimer}>
              >KITCHEN TIMER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
