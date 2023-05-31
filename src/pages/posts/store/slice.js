/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  data: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: state => {
      state.isLoading = true;
    },
    fetchPostsSuccess: (state, action) => {
      state.data = action?.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer } = postsSlice;

export const { fetchPosts, fetchPostsSuccess } = actions;

export default reducer;
