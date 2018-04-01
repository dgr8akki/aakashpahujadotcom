import React from 'react';
import Logo from '../Logo';
import ApMenu from '../ApMenu';
import Bot from '../Bot';

const ApHeader = () => (
  <div id="header">
    <ApMenu />
    <Logo />
    <Bot />
  </div>
);

export default ApHeader;
