import postsReducer from 'pages/posts/store/slice';
import uiReducer from './slices/ui-slice';

const createRootReducer = () => {
  return { postsReducer, uiReducer };
};

export default createRootReducer;
