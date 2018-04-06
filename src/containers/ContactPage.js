import React, { Component } from 'react';
import HomepageHeading from '../components/HomepageHeading';
import HomepageDescription from '../components/HomepageDescription';
import HomepageMouse from '../components/HomepageMouse';
import HomepageSocialButtons from '../components/HomepageSocialButtons';

class ContactPage extends Component {
  render() {
    return (
      <div className="page" id="contact">
        <HomepageSocialButtons />
      </div>
    );
  }
}

export default ContactPage;
