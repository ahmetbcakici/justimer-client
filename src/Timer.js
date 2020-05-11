import React, {useState, useEffect} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {differenceInSeconds, differenceInMinutes} from 'date-fns';
import axios from './config/axios';
import io from 'socket.io-client';

import GithubCorner from 'react-github-corner';
import logo from './assets/images/logo_new.png';
import soundfile from './assets/mp3/bell.mp3';
import './Timer.css';

const socket = io('https://justimerapi.ahmetbugracakici.com');

let socket_check = false;
export default function Timer(props) {
  const [timerData, setTimerData] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(59);
  const {timerlink} = props.match.params;
  let audio = new Audio(soundfile);

  socket.on('starttimerr', (data) => {
    if (!socket_check) {
      if (!timerData.firstRunTimerTime && timerData) {
        getDatasetStates();
        socket_check = true;
      }
    }
  });

  useEffect(() => {
    getDatasetStates();
  }, []);

  useEffect(() => {
    if (timerData.firstRunTimerTime) {
      timer();
      setInterval(() => {
        timer();
      }, 1000);
    }
  }, [timerData]);

  const timer = () => {
    const {firstRunTimerTime, workTime, breakTime} = timerData;
    const start = new Date(firstRunTimerTime);
    const current = new Date();
    const diffInSec = differenceInSeconds(current, start);
    const diffInMin = differenceInMinutes(current, start);

    const totalSessionMin = workTime + breakTime;
    const calculation =
      totalSessionMin -
      (diffInMin - totalSessionMin * Math.floor(diffInMin / totalSessionMin));

    let diffInSecRemain = 59 - (diffInSec - diffInMin * 60);
    if (diffInSecRemain.toString().length < 2)
      diffInSecRemain = '0' + diffInSecRemain; // put zero front of seconds if there is just one numeral

    let remainMinToEndSession;

    if (calculation > breakTime) {
      // workTime
      remainMinToEndSession = calculation - breakTime - 1;
      setMin(remainMinToEndSession);
    } else {
      // breakTime
      remainMinToEndSession = calculation - 1;
      setMin(remainMinToEndSession);
    }

    ringHandle(diffInSecRemain, remainMinToEndSession);
    setSec(diffInSecRemain);
  };

  const ringHandle = (diffInSecRemain, remainMinToEndSession) => {
    if (diffInSecRemain == 0 && remainMinToEndSession == 0) {
      audio.play();
    }
  };

  const getDatasetStates = async () => {
    const {data} = await axios.get(`/api/timers/${timerlink}`);
    setIsAdmin(data.adminLink === timerlink);
    setMin(data.workTime - 1);
    setTimerData(data);
  };

  const startTimer = async () => {
    const {adminLink} = timerData;
    await axios.put('/api/setruntime', {adminLink});
    getDatasetStates();
    socket.emit('starttimer', {adminLink});
  };

  const closeOverlay = (e) => {
    e.target.style.display = 'none';
  };

  const {viewLink, firstRunTimerTime} = timerData;
  const {hostname} = window.location;

  if (!timerData) return <div>Not Found</div>;
  return (
    <div>
      <GithubCorner
        href="https://github.com/ahmetbcakici/justimer-client"
        direction={'right'}
        size={91}
      />
      {/* Viewer Link Area */}
      <div className="p-2 bg-dark text-white text-center">
        <div className="text-center bangers">
          <br/>
          <CopyToClipboard
            text={`https://justimer.ahmetbugracakici.com/${viewLink}`}
          >
            <a href="#">
              <span>CLICK HERE TO COPY SHARE LINK</span>
            </a>
          </CopyToClipboard>
          <br/>
          <br/>
        </div>
        <div className="text-left p-0 m-0" class="justimer-logo">
          <a href="https://justimer.ahmetbugracakici.com">
            <img src={logo} alt="logo.png" width={75} />
          </a>
        </div>
      </div>

      {/* Timer Area */}
      <div
        id="overlay"
        style={{display: firstRunTimerTime || !isAdmin ? 'none' : 'block'}}
        onClick={(e) => {
          closeOverlay(e);
          startTimer();
        }}
      >
        <br />
        <br />
        <br />
        <p className="text-center display-1 text-white">
          CLICK HERE TO START YOUR TIMER
        </p>
      </div>
      <div className="text-center timer-area">
        <br/>
        <br/>
        <br/>
        <p className="display-1 timer">{`${min}:${sec}`}</p>
        <br />
        {/* <p className="text-center ">{isWork}</p> */}
      </div>
    </div>
  );
}
