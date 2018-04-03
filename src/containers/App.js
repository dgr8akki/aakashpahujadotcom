import React, { Component } from "react";
import ApHeader from "../components/ApHeader";
import Homepage from "./Homepage";
import MyWorkPage from "./MyWorkPage";
import ExperiencePage from "./ExperiencePage";
import SkillsPage from "./SkillsPage";
import ContactPage from "./ContactPage";

class App extends Component {
  render() {
    return (
      <div>
        <ApHeader />
        <Homepage />
        <MyWorkPage />
        <ExperiencePage />
        <SkillsPage />
        <ContactPage />
      </div>
    );
  }
}

export default App;
