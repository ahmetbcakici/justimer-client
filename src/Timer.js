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
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(59);
  const {timerlink} = props.match.params;

  useEffect(async () => {
    const {data} = await axios.get(`/api/timers/${timerlink}`);
    if (data.adminLink === timerlink) setIsAdmin(true);
    if (data.isPomodoro) setMin(24);
    setTimerData(data);
  }, []);

  useEffect(() => {
    console.log("aa")
    const {runTimerTime} = timerData;
    const start = new Date(runTimerTime);
    /* console.log(start); */

    setInterval(() => {
      const current = new Date();
      const diffInSec = differenceInSeconds(current, start);
      const diffInMin = differenceInMinutes(current, start);
      const test = diffInSec - diffInMin * 60;
      console.log(test)
      console.log(diffInSec,diffInMin)
      setMin(25 - diffInMin);
      setSec(59 - test);
      /* console.log(diffMin); */
    },1000)
  }, [min]);

  const startTimer = () => {
    const {adminLink} = timerData;
    axios.put('/api/setruntime', {adminLink});
  };

  return (
    <div>
      <Navbar />
      {/* Viewer Link Area */}
      <p className="p-2 bg-dark text-white text-center">
        <span className="input-group input-group-center w-25">
          <span className="pt-1">Viewer Link:</span>&nbsp;&nbsp;
          <input
            type="text"
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={`${window.location.hostname}/${timerData.viewLink}`}
          />
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <CopyToClipboard
                text={`${window.location.hostname}/${timerData.viewLink}`}
              >
                <a href="#">
                  <i className="fas fa-copy"></i>
                </a>
              </CopyToClipboard>
            </span>
          </div>
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              <a href="#">
                <i className="fas fa-cog"></i>
              </a>
            </span>
          </div>
        </span>
      </p>

      {/* Timer Area */}
      <div className="text-center">
        <p className="display-1">{`${min}:${sec}`}</p>
        <button
          type="button"
          class="btn btn-secondary btn-lg w-25"
          onClick={startTimer}
        >
          START Timer
        </button>
        <br />
        <br />
        <div class="form-check w-25 input-group-center border py-2">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Repeat timer sequence forever
          </label>
        </div>
        <br />
        <div class="input-group mb-3 w-25 input-group-center">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">
              <i class="fas fa-bell"></i>
            </span>
          </div>
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>{timerData.bellSound}</option>
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
