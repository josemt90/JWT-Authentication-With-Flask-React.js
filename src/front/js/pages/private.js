import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const { user, setUser } = useState([]);

  useEffect(() => {
    actions.getSingleUser();
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-center text-danger">
        Hola {store.singleUser ? store.singleUser.name : "Loading..."}{" "}
      </h1>
    </div>
  );
};
