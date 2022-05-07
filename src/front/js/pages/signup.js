import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});
  const [message, setMessage] = useState({});

  useEffect(() => {
    actions.getRoles();
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log(data);
    fetch(process.env.BACKEND_URL + "/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setMessage(resp));
    console.log(resp);
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="form-control"
                id="nameId"
                placeholder="Name"
              />
            </div>
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
            <div className="mb-3">
              <label className="form-label">Seleccione un rol</label>
              <select
                className="form-select"
                name="role"
                defaultValue={"role"}
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option selected>Role</option>

                {store.roles.map((value, index) => {
                  return (
                    <option key={index} value={value.id}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Create
            </button>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};
