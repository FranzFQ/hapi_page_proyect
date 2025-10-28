import axios from "axios";

const userApi = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const registerUser = async (userData) =>
  userApi.post(`users/`, userData);

export const getUserById = async (userId) =>
  userApi.get(`users/${userId}/`);

export const getUserByEmail = async (userEmail) =>
  userApi.get(`users/?email=${userEmail}`);

export const createClientProfile = async (loginData) =>
  userApi.post(`client-profiles/`, loginData);

export const getClientByUserId = async (userId) =>
  userApi.get(`client-profiles/?user_id=${userId}/`);
