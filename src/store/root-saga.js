import { all } from 'redux-saga/effects';
import { watchPostsPageRequests } from 'pages/posts/store/saga';

export default function* rootSaga() {
  yield all([watchPostsPageRequests()]);
}
