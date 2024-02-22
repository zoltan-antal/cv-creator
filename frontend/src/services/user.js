import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.BACKEND_URL}/users`;

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

async function getUser() {
  const requestConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/me`, requestConfig);
  return response.data;
}

async function createUser(credentials) {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
}

async function deleteUser(password) {
  const requestConfig = {
    headers: { Authorization: token },
  };
  return await axios.post(`${baseUrl}/me/delete`, { password }, requestConfig);
}

async function updateUser(credentials) {
  const requestConfig = {
    headers: { Authorization: token },
  };
  return await axios.patch(`${baseUrl}/me`, credentials, requestConfig);
}

export default { getUser, createUser, deleteUser, updateUser, setToken };
