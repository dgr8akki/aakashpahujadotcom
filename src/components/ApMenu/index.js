import React, { Component } from "react";
import "./index.css";

const animationOnMenuClick = e => {
  document
    .getElementsByClassName("menu__item--current")[0]
    .classList.remove("menu__item--current");
  e.target.parentElement.classList.add("menu__item--current");
};
class ApMenu extends Component {
  render() {
    return (
      <div id="menu">
        <nav className="menu menu--miranda">
          <ul className="menu__list">
            <li className="menu__item menu__item--current">
              <a
                href="#"
                className="menu__link"
                onClick={e => animationOnMenuClick(e)}
              >
                home
              </a>
            </li>
            <li className="menu__item">
              <a
                href="#"
                className="menu__link"
                onClick={e => animationOnMenuClick(e)}
              >
                my work
              </a>
            </li>
            <li className="menu__item">
              <a
                href="#"
                className="menu__link"
                onClick={e => animationOnMenuClick(e)}
              >
                experience
              </a>
            </li>
            <li className="menu__item">
              <a
                href="#"
                className="menu__link"
                onClick={e => animationOnMenuClick(e)}
              >
                skills
              </a>
            </li>
            <li className="menu__item">
              <a
                href="#"
                className="menu__link"
                onClick={e => animationOnMenuClick(e)}
              >
                contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default ApMenu;
