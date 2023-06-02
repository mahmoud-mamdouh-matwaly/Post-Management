import { BASE_URL } from '../utils';

export const getPostsRequest = () => {
  return {
    url: `${BASE_URL}posts`,
    method: 'GET',
  };
};

export const getPostItemRequest = ({ id }) => {
  return {
    url: `${BASE_URL}posts/${id}`,
    method: 'GET',
  };
};

export const getUpdatePostItemRequest = ({ id, values }) => {
  return {
    url: `${BASE_URL}posts/${id}`,
    method: 'PUT',
    body: values,
  };
};

export const getDeletePostItemRequest = ({ id }) => {
  return {
    url: `${BASE_URL}posts/${id}`,
    method: 'DELETE',
  };
};
