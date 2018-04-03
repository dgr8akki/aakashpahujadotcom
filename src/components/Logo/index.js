import React from "react";

const handleClick = e => {
  document
    .getElementsByClassName("menu__item--current")[0]
    .classList.remove("menu__item--current");
  const scrollElement = document.getElementById("home");
  document
    .getElementsByClassName("menu__item")[0]
    .parentElement.children[0].classList.add("menu__item--current");
  window.scroll({
    top: scrollElement.offsetTop - 160,
    behavior: "smooth"
  });
};
const Logo = () => (
  <div id="logo" onClick={e => handleClick()}>
    <span>AP</span>
  </div>
);

export default Logo;
