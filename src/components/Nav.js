import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Nav() {
  return (
    <div className="Nav">
      <Link to="/">
        <img src="/assets/app-logo.svg" className="app-logo" />
      </Link>
      <Link to="/login">
        <button className="login">Login</button>
      </Link>
    </div>
  );
}

export default Nav;
