import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <p className="text-left" style={{color: '#ECECEC'}}>
          &nbsp;<i>share your TIMER with your friends</i>
      </p>
      <p className="text-right">
        <a
          className="github-button"
          href="https://github.com/ntkme/github-buttons"
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
