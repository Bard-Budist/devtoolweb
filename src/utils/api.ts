import axios from "axios";
import { UserData } from "../interfaces/UserInterfaces";
import { ulrBackProd, ulrBackDev } from "../config-env";

// Get token from local storage and return it
const getToken = () => {
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return "";
  }
  const user: UserData = JSON.parse(userJson);
  return user.token;
}

export const api = axios.create({
  baseURL: ulrBackProd
});

export const apiAuth = axios.create({
  baseURL: ulrBackProd,
  headers: {
    'access-token':getToken(),
  }
});

export const apiAuthDev = axios.create({
  baseURL: ulrBackDev,
  headers: {
    'access-token':getToken(),
  }
});

