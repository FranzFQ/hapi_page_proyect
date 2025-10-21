import axios from "axios";

const userApi = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const registerUser = async (userData) =>
  userApi.post("users/", userData);

export const getAllUsers = async () => userApi.get("users/");

export const getUsersByEmail = async (userEmail) =>
  userApi.get(`users/${userEmail}/`);

export const clientLogin = async (loginData) =>
  userApi.post("client-profiles/", loginData);
