import postsReducer from 'pages/posts/store/slice';

const createRootReducer = () => {
  return { postsReducer };
};

export default createRootReducer;
