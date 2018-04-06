import React from 'react';

const startAnimate = (e) => {
  e.preventDefault();
  e.target.classList.add('slideOutDown', 'animated');
};
const stopAnimate = (e) => {
  e.preventDefault();
  e.target.classList.remove('slideOutDown', 'animated');
};
const HomepageMouse = () => (
  <div id="homepageMouse">
    <i
      className="fa-mouse"
      onMouseEnter={e => startAnimate(e)}
      onMouseLeave={e => stopAnimate(e)}
    />
  </div>
);

export default HomepageMouse;
