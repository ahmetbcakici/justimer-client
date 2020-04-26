import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <p className="text-left" style={{color: '#ECECEC'}}>
          &nbsp;<i></i>
      </p>
      <p className="text-center">
        <a
          className="github-button"
          href="https://github.com/ahmetbcakici/justimer-client"
          data-icon="octicon-star"
          data-size="large"
          aria-label="Star ntkme/github-buttons on GitHub"
        >
          Star & Contribute this project on GitHub
        </a>
      </p>
    </footer>
  );
}
