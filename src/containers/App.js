import React, { Component } from 'react';
import ApHeader from '../components/ApHeader';
import Homepage from './Homepage';

class App extends Component {
  render() {
    return (
      <div>
        <ApHeader />
        <Homepage />
      </div>
    );
  }
}


export default App;
