import React from 'react';
import './ChooseArea.css';

export default function ChooseArea() {
  return (
    <div className="parent p-5">
      <div className="container">
        <p className="display-3 text-center font-weight-bold text-white">YOUR CUSTOM TIMERS</p>
        <p className="text-center text-white">Choose A Option:</p>
        <div className="row text-center">
            <div className="col-4"><button className="btn btn-danger">Denemedir Bu</button></div>
            <div className="col-4"><button className="btn btn-danger">Denemedir Bu</button></div>
            <div className="col-4"><button className="btn btn-danger">Denemedir Bu</button></div>
        </div>
      </div>
    </div>
  );
}
