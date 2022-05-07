import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

export const Navbar = () => {
  const history = useHistory();
  let login = localStorage.getItem("token");

  function logOut() {
    localStorage.clear();
    history.push("/");
    location.reload();
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        {login ? (
          <div className="ml-auto">
            <Link to={`/private`}>
              <button type="button" className="btn btn-success">
                Go to private page
              </button>
            </Link>
            <button onClick={logOut} className="btn btn-danger border-0 ">
              <div className="row "></div>
              Logout
            </button>
          </div>
        ) : (
          <div className="ml-auto">
            <Link to="/signup">
              <button className="btn btn-primary">Signup</button>
            </Link>
            <Link to="/login">
              <button className=" mx-3 btn btn-success">Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
