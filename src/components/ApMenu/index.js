import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

class ApMenu extends Component {
  render() {
    return (
      <div id="menu">
        <Icon name='bars' size="large" />
        <span>Menu</span>
      </div>
    )
  }
}

export default ApMenu;

