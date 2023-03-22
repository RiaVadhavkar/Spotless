import React from "react";
import "bulma/css/bulma.min.css";
import { navbar } from "react-bulma-components";
import logo from "../assets/logo.png";
import "../views/temporary.css"

const Header = () => {
  return (
    <nav
     id="header-nav"
      class="navbar is-fixed-top has-background-black-ter"
      role="navigation"
      aria-label="main-navigation"
      style={{backgroundColor: "blue !important"}}
    >
      <div class="navbar-brand">
        <a
          class="navbar-item has-text-white is-size-3 has-text-weight-bold"
          href="index.html"
        >
          {/* TODO - Add home page link */}
          <img src={logo} alt="logo" />
          <span class="has-text-success">Spot</span>
          <span>less</span>
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item has-text-white is-size-4">List</a>
          <a class="navbar-item has-text-white is-size-4">Favorites</a>
          <a class="navbar-item has-text-white is-size-4">Stats</a>
          <a class="navbar-item has-text-white is-size-4">Social</a>
          <a class="navbar-item has-text-white is-size-4">Settings</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button has-background-success has-text-white has-text-weight-bold is-rounded">
              <i class="fa-solid fa-user"></i>&nbsp;LOGOUT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
