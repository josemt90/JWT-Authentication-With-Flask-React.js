import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
  const history = useHistory();

  useEffect(() => {}, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    actions.createToken(data);
    history.push("/");
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
                id="emailId"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="form-control"
                id="passwordId"
                placeholder="password"
              />
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-danger"
            >
              OK
            </button>
          </form>

          <div className=" my-3 text-center">
            {store.token ? (
              <div class="alert alert-success" role="alert">
                Usuario validado correctamente!!
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
