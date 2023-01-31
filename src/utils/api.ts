import axios from "axios";

// Get token from local storage and return it
const getToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return "";
  }
  return token;
}

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const apiAuth = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'access_token': getToken(),
  }
});

