import React, { Component } from 'react';
import HomepageHeading from '../components/HomepageHeading';
import HomepageDescription from '../components/HomepageDescription';
import HomepageMouse from '../components/HomepageMouse';
import HomepageSocialButtons from '../components/HomepageSocialButtons';

class App extends Component {
  render() {
    return (
      <div className="homepage">
        <HomepageHeading />
        <HomepageDescription />
        <HomepageSocialButtons />
        <HomepageMouse />
      </div>
    );
  }
}


export default App;
