/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: [],
  postItem: null,
  currentPage: 1,
  searchTerm: '',
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
    },

    setPostItem: (state, action) => {
      state.postItem = { ...action.payload };
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
    },

    updatePostItem: state => {
      state.isLoading = true;
      return state;
    },
    updatePostItemSuccess: (state, action) => {
      state.data = state.data.map(post => (post?.id === action.payload?.id ? action.payload : post));
      state.isLoading = false;
    },
    updatePostItemFailed: state => {
      state.isLoading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: state => state,
    setSearchTermSuccess: (state, action) => {
      state.searchTerm = action.payload;
    },

    deletePostItem: state => {
      state.isLoading = true;
      return state;
    },
    deletePostItemSuccess: (state, action) => {
      state.data = state.data?.filter(post => post.id !== action.payload);
      state.isLoading = false;
    },
    deletePostItemFailed: state => {
      state.isLoading = false;
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
  setCurrentPage,
  setSearchTerm,
  setSearchTermSuccess,
  deletePostItem,
  deletePostItemSuccess,
  deletePostItemFailed,
} = actions;

export default reducer;
