import axios from 'axios';
import config from './config';

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

export default { getUser, setToken };
