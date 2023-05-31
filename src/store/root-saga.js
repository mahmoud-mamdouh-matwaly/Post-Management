import { all } from 'redux-saga/effects';
import { watchPostsListPageRequests } from 'pages/posts/store/saga';

export default function* rootSaga() {
  yield all([watchPostsListPageRequests()]);
}
