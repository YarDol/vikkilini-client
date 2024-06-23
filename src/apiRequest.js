import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://vikkilini.herokuapp.com/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
