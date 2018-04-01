import React from 'react';
import { Button } from 'semantic-ui-react';

const clickHandler = e => {
  e.preventDefault();
  switch (e.target.innerText) {
    case 'Github': window.open('https://github.com/dgr8akki', '_blank');
      break;
    case 'Facebook': window.open('https://www.facebook.com/dgr8akki', '_blank');
      break;
    case 'Twitter': window.open('https://twitter.com/ImAakashPahuja', '_blank');
      break;
    case 'Linkedin': window.open('https://www.linkedin.com/in/dgr8akki/', '_blank');
      break;
    default:
      break;
  }
}

const ApButton = props => (
  <div id="btn">
    <Button content={props.title} onClick={e => clickHandler(e)} />
  </div>
);

export default ApButton;
