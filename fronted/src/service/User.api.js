import axios from "axios";

const userApi = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// User APIs

export const createUser = async (userData) =>
  userApi.post(`users/`, userData);

export const getUserById = async (userId) =>
  userApi.get(`users/${userId}`);

export const getUserByEmail = async (userEmail) =>
  userApi.get(`users/?email=${userEmail}`);

export const getUserByReferralCode = async (referralcode) => 
  userApi.get(`users/?referral_code=${referralcode}`);

export const updateUser = async (userId, updateData) =>
  userApi.patch(`users/${userId}/`, updateData);

// Client Profile APIs

export const createClientProfile = async (loginData) =>
  userApi.post(`client-profiles/`, loginData);

export const getClientByUserId = async (userId) =>
  userApi.get(`client-profiles/?user_id=${userId}`);

// Referral APIs

export const createReferral = async (referralData) =>
  userApi.post(`referrals/`, referralData);

export const getReferralByUserId = async (userId) =>
  userApi.get(`referrals/?user_recibe=${userId}`);

export const updateReferral = async (referralId, updateData) =>
  userApi.patch(`referrals/${referralId}/`, updateData)

