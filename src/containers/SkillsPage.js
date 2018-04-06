import React, { Component } from 'react';
import HomepageHeading from '../components/HomepageHeading';
import HomepageDescription from '../components/HomepageDescription';
import HomepageMouse from '../components/HomepageMouse';
import HomepageSocialButtons from '../components/HomepageSocialButtons';
import ApSkills from '../components/ApSkills';

class SkillsPage extends Component {
  render() {
    return (
      <div className="page" id="skills">
        <ApSkills />
      </div>
    );
  }
}

export default SkillsPage;
