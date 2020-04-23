import React from 'react';
import logo from './logo.png';
import GithubCorner from 'react-github-corner';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand p-0 m-0">
      <GithubCorner
        href="https://github.com/ahmetbcakici/justimer-client"
        direction={'left'}
        size={107}
      />

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        <ul>
          <a href="/">
          <img src={logo} alt="Logo" className="logo" />
          </a>
        </ul>
      </div>
    </nav>
  );
}
