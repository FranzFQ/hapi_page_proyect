import axios from "axios";

export const registerUser = async (userData) => {
    return await axios.post(
      "http://127.0.0.1:8000/users/users/",
      userData
    );
};

export const clientLogin = async (loginData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/users/client-profiles/",
      loginData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
