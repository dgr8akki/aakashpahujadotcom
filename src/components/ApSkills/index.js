import React from 'react';
import './tagcanvas.min';

const ApSkills = () => (
  <div id="myCanvasContainer">
    <canvas width="300" height="300" id="myCanvas">
      <p>Canvas element</p>
      <ul>
        <li>
          <a href="http://www.google.com" target="_blank">
            Google
          </a>
        </li>
        <li>
          <a href="/fish">Fish</a>
        </li>
        <li>
          <a href="/chips">Chips</a>
        </li>
        <li>
          <a href="/salt">Salt</a>
        </li>
        <li>
          <a href="/vinegar">Vinegar</a>
        </li>
      </ul>
    </canvas>
  </div>
);

export default ApSkills;
