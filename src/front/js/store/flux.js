const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      roles: [],
      singleUser: [],
    },
    actions: {
      // Use getActions to call a function within a fuction

      getRoles: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/role")
          .then((resp) => resp.json())
          .then((data) => setStore({ roles: data }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      getSingleUser: () => {
        let token = localStorage.getItem("token");

        fetch(process.env.BACKEND_URL + "/api/userDetail", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: localStorage.getItem("token"),
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setStore({ singleUser: data });
            console.log(data);
          })

          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      createToken: (data) => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/token", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("token", data.token);
            }
            location.reload();
          });
      },

      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
