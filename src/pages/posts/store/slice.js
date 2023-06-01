/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
  error: false,
  postItem: null,
  actionStatus: 'idle',
  currentPage: 1,
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

    setPostItem: (state, action) => {
      state.postItem = action.payload;
    },

    fetchPostItem: state => {
      state.isLoading = true;
      return state;
    },
    fetchPostItemSuccess: (state, action) => {
      state.postItem = { ...action.payload };
      state.isLoading = false;
    },
    fetchPostItemFailed: state => {
      state.isLoading = false;
      state.error = true;
    },

    updatePostItem: state => {
      state.isLoading = true;
      return state;
    },
    updatePostItemSuccess: (state, action) => {
      state.data = state.data.map(post => (post?.id === action.payload?.id ? action.payload : post));
      state.isLoading = false;
      state.actionStatus = 'success';
    },
    updatePostItemFailed: state => {
      state.isLoading = false;
      state.error = true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    restActionStatus: state => {
      state.actionStatus = 'idle';
    },
  },
});

const { actions, reducer } = postsSlice;

export const {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailed,
  setPostItem,
  fetchPostItem,
  fetchPostItemSuccess,
  fetchPostItemFailed,
  updatePostItem,
  updatePostItemSuccess,
  updatePostItemFailed,
  restActionStatus,
  setCurrentPage,
} = actions;

export default reducer;
