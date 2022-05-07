import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});

  useEffect(() => {
    actions.getRoles();
  }, []);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    fetch(process.env.BACKEND_URL + "/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  };

  return (
    <div className="container">
      <div className="text-center mt-5">
        <h1 className="mb-3">JWT Authentication With Flask & React.js</h1>
        <img
          src="https://www.osi.es/sites/default/files/images/imagen-decorativa-infografia-cuentas-usuario.png"
          class="img-fluid"
          alt="..."
        />
      </div>
    </div>
  );
};
