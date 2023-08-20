import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";

function Nav() {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  return (
    <div className="Nav">
      <Link to="/">
        <img src="/assets/app-logo.svg" className="app-logo" />
      </Link>
      {userInfo ? (
        userInfo.status === "ok" ? (
          <Link to="/profile">
            <button className="profile">Profile</button>
          </Link>
        ) : (
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
        )
      ) : (
        <Link to="/login">
          <button className="login">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Nav;
