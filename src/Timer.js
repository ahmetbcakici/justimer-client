import React, {useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {differenceInSeconds, differenceInMinutes} from 'date-fns';

import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './Timer.css';

export default function Timer(props) {
  const [timerData, setTimerData] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(59);
  const {timerlink} = props.match.params;

  useEffect(() => {
    getDatasetStates();
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (timerData !== '') timer();
    }, 1000);
  }, [timerData]);

  const timer = () => {
    const {runTimerTime} = timerData;
    const start = new Date(runTimerTime);
    if (isNaN(start)) return;
    const current = new Date();
    const diffInSec = differenceInSeconds(current, start);
    const diffInMin = differenceInMinutes(current, start);
    let diffInSecRemain = 59 - (diffInSec - diffInMin * 60);
    //if(diffInSecRemain.toString().length < 2 ) diffInSecRemain = "0" + diffInSecRemain; 
    setMin(24 - diffInMin);
    setSec(diffInSecRemain);
  };

  const getDatasetStates = async () => {
    const {data} = await axios.get(`/api/timers/${timerlink}`);
    setIsAdmin(data.adminLink === timerlink);
    setMin(data.isPomodoro ? 24 : 0);
    setTimerData(data);
  };

  const startTimer = () => {
    const {adminLink} = timerData;
    axios.put('/api/setruntime', {adminLink});
    getDatasetStates();
  };
  
  const {viewLink, bellSound, runTimerTime} = timerData;
  const {hostname} = window.location;

  return (
    <div>
      <Navbar />
      {/* Viewer Link Area */}
      <div className="p-2 bg-dark text-white text-center">
        <span className="input-group input-group-center w-25">
          <span className="pt-1">
            {isAdmin ? 'Viewer Link:' : 'Share Link:'}
          </span>
          &nbsp;&nbsp;
          <input
            type="text"
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            /* value={`${hostname}/${viewLink}`} */
            value={`localhost:3000/${viewLink}`}
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              {/* <CopyToClipboard text={`${hostname}/${viewLink}`}> */}
              <CopyToClipboard text={`localhost:3000/${viewLink}`}>
                <a href="#">
                  <i className="fas fa-copy"></i>
                </a>
              </CopyToClipboard>
            </span>
          </div>
          <div
            className="input-group-append"
            style={{display: !isAdmin ? 'none' : ''}}
          >
            <span className="input-group-text" id="basic-addon2">
              <a href="#">
                <i className="fas fa-cog"></i>
              </a>
            </span>
          </div>
        </span>
      </div>

      {/* Timer Area */}
      <div className="text-center">
        <p className="display-1">{`${min}:${sec}`}</p>
      </div>

      {/* Timer Management Area */}
      <div className="text-center" style={{display: !isAdmin ? 'none' : ''}}>
        <button
          type="button"
          className="btn btn-secondary btn-lg w-25"
          onClick={startTimer}
          disabled={runTimerTime ? true : false}
        >
          {runTimerTime ? 'Timer Started' : 'Start Timer'}
        </button>
        <br />
        <br />
        <div className="form-check w-25 input-group-center border py-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Repeat timer sequence forever
          </label>
        </div>
        <br />
        <div className="input-group mb-3 w-25 input-group-center">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-bell"></i>
            </span>
          </div>
          <select className="custom-select" id="inputGroupSelect01">
            <option defaultValue>{bellSound}</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
