import { requestAPI } from './request';
import { MAYI_AUTH_SERVER_URL } from '../constants';

export const echo = () => {
  return requestAPI({}).get('http://api.flyingant.me/echo');
};

export const login = ({ username, password }) => {
  return requestAPI({
    headers: {
      'content-type': 'application/json',
    },
  }).post(`${MAYI_AUTH_SERVER_URL}`, {
    username,
    password,
  });
};

export default {
  echo,
  login,
};
