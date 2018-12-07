import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // apply token to every request in Authorization header
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common["Authorization"]; // The JavaScript delete operator removes a property from an object
  }
};

export default setAuthToken;
