import { BASE_URL } from '../utils';

export const getPostsRequest = () => {
  return {
    url: `${BASE_URL}posts`,
    method: 'GET',
  };
};
