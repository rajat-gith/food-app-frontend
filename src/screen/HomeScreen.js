import React from "react";
import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div className="HomeScreen">
      <div className="HomeScreenContent">
        <p className="tagline">
          Unlock Flavorful Adventures: <br />
          <span className="highlightContent">Explore,Cook and Savor </span>{" "}
          <br></br>
          with Our Food Recipe App!
        </p>
        <Link to="/receipes">
          <button className="exploreButton">Explore</button>
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;
