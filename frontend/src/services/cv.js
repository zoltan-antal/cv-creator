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

export default { getCVs, setToken };
