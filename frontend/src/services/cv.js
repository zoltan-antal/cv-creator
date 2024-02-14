import axios from 'axios';
import config from '../utils/config';

const baseUrl = `${config.BACKEND_URL}/cvs`;

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

async function getCVs() {
  const requestConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}`, requestConfig);
  return response.data;
}

async function createCV(cv) {
  const requestConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}`, cv, requestConfig);
  return response.data;
}

async function updateCV(id, cv) {
  const requestConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, cv, requestConfig);
  return response.data;
}

async function deleteCV(id) {
  const requestConfig = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, requestConfig);
  return response.data;
}

export default { getCVs, createCV, updateCV, deleteCV, setToken };
