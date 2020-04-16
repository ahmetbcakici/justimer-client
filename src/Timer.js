
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {differenceInSeconds, differenceInMinutes} from 'date-fns';

import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './Timer.css';


import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props){
    super(props);
    this.state={
      timerData:'',
      isAdmin:'',
      min:0,
      sec:59,
      timerlink:props.match.params.timerlink
    }
  }
  

  async componentDidMount () {
    const {data} = await axios.get(`/api/timers/${this.state.timerlink}`);
    if (data.adminLink === this.state.timerlink) this.setState({isAdmin:true})
    if (data.isPomodoro) this.setState({min:24})
    this.setState({timerData:data})
    
    //setInterval(this.timer,1000)

    setInterval(() => {
      this.timer()
    }, 1000)
  }

  timer = () => {
    console.log("bom")
    const {runTimerTime} = this.state.timerData;
    const start = new Date(runTimerTime);
    console.log(start)
    const current = new Date();
    const diffInSec = differenceInSeconds(current, start);
    const diffInMin = differenceInMinutes(current, start);
    if(isNaN(diffInMin)) return;
    const test = diffInSec - diffInMin * 60;
    console.log(test)
    console.log(diffInSec,diffInMin)
    this.setState({min:25 - diffInMin,sec:59 - test})
    /* console.log(diffMin); */
  }

  startTimer = () => {
    const {adminLink} = this.state.timerData;
    axios.put('/api/setruntime', {adminLink});
  };
  

  render() {
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
              value={`${window.location.hostname}/${this.state.timerData.viewLink}`}
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                <CopyToClipboard
                  text={`${window.location.hostname}/${this.state.timerData.viewLink}`}
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
          <p className="display-1">{`${this.state.min}:${this.state.sec}`}</p>
          <button
            type="button"
            class="btn btn-secondary btn-lg w-25"
            onClick={this.startTimer}
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
              <option selected>{this.state.timerData.bellSound}</option>
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
}


