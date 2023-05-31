/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: null,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: state => {
      state.isLoading = true;
      return state;
    },
    fetchPostsSuccess: (state, action) => {
      state.data = [...action.payload];
      state.isLoading = false;
    },
    fetchPostsFailed: state => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

const { actions, reducer } = postsSlice;

export const { fetchPosts, fetchPostsSuccess, fetchPostsFailed } = actions;

export default reducer;
