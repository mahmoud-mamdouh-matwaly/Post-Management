import axios from 'axios';

export const execute = ({ method, url, body, params, headers }) => {
  return axios
    .request({
      url,
      method,
      data: body,
      params,
      headers,
    })
    .catch(error => {
      throw error;
    });
};
