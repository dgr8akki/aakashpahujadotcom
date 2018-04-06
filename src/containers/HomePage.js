import React, { Component } from 'react';
import HomepageHeading from '../components/HomepageHeading';
import HomepageDescription from '../components/HomepageDescription';
import HomepageMouse from '../components/HomepageMouse';
import HomepageSocialButtons from '../components/HomepageSocialButtons';

class Homepage extends Component {
  render() {
    return (
      <div className="page" id="home">
        <HomepageHeading />
        <HomepageDescription />
        <HomepageMouse />
      </div>
    );
  }
}

export default Homepage;
