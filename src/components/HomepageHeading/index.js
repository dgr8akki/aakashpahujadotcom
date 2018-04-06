import React from 'react';

const startAnimate = (e) => {
  e.preventDefault();
  e.target.classList.add('pulse', 'animated');
};
const stopAnimate = (e) => {
  e.preventDefault();
  e.target.classList.remove('pulse', 'animated');
};
const HomepageHeading = () => (
  <div
    id="homepageHeading"
    onMouseEnter={e => startAnimate(e)}
    onMouseLeave={e => stopAnimate(e)}
  >
    <h1>HELLO</h1>
  </div>
);

export default HomepageHeading;
