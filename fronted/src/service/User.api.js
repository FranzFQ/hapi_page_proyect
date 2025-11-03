import axios from "axios";
import { EclipseIcon } from "lucide-react";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

// User APIs

export const createUser = async (userData) => userApi.post(`users/`, userData);

export const getUserById = async (userId) => userApi.get(`users/${userId}`);

export const getUserByEmail = async (userEmail) =>
  userApi.get(`users/?email=${userEmail}`);

export const getUserByReferralCode = async (referralcode) =>
  userApi.get(`users/?referral_code=${referralcode}`);

export const updateUser = async (userId, updateData) =>
  userApi.patch(`users/${userId}/`, updateData);

// Client Profile APIs

export const createClientProfile = async (loginData) =>
  userApi.post(`client-profiles/`, loginData);

export const getClientById = async (ClientId) =>
  userApi.get(`client-profiles/${ClientId}`);

export const getClientByUserId = async (userId) =>
  userApi.get(`client-profiles/?user=${userId}`);

export const updateClient = async (clientId, updateData) =>
  userApi.patch(`client-profiles/${clientId}/`, updateData);

// Referral APIs

export const createReferral = async (referralData) =>
  userApi.post(`referrals/`, referralData);

export const getReferralByUserId = async (userId) =>
  userApi.get(`referrals/?user_recibe=${userId}`);

export const updateReferral = async (referralId, updateData) =>
  userApi.patch(`referrals/${referralId}/`, updateData);

// Portafolio APIs

export const createPortfolio = async (portfolioData) =>
  userApi.post(`portfolio/`, portfolioData);

export const getPortfolioByClientId = async (ClientId) =>
  userApi.get(`portfolio/?client_profile=${ClientId}`);

export const updatePortafolio = async (portfolioId, updateData) =>
  userApi.patch(`portfolio/${portfolioId}/`, updateData);

// Portafolio investment APIs

export const createPortfolioInvestment = async (portfolioInvestmentData) =>
  userApi.get(`portfolioinvestment/`, portfolioInvestmentData);

export const getPortfolioInvestmentByPortafolioId = async (portfolioId) =>
  userApi.get(`portfolioinvestment/?portafolio=${portfolioId}`);

export const updatePortfolioInvestment = async (
  portfolioInvestmentId,
  updateData
) => {
  userApi.patch(`portfolioinvestment/${portfolioInvestmentId}/`, updateData);
};

// Transfer APIs

export const createTransfer = async (transferData) =>
  userApi.post(`transfer/`, transferData);

export const getTransferByClientId = async (clientId) => 
  userApi.get(`transfer/?client=${clientId}`)

// Lists APIs

export const createList = async (listData) => {
  userApi.post(`lists/`, listData)
}

// Lists Details APIs

export const createListDetail = async (listData) => {
  userApi.post(`lists-details`, listData)
}