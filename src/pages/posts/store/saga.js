import { takeLatest, put, call } from 'redux-saga/effects';
import { execute } from 'services';
import { showError } from 'utils/utility-sagas';

import { fetchPosts, fetchPostsSuccess, fetchPostsFailed } from './slice';

import { getPostsRequest } from 'services/request-creators/posts';

function* handlePostsListRequests() {
  try {
    const { data } = yield call(execute, getPostsRequest());

    yield put(fetchPostsSuccess(data));
  } catch (error) {
    yield put(fetchPostsFailed());
    yield showError(error);
  }
}

export function* watchPostsListPageRequests() {
  yield takeLatest(fetchPosts.type, handlePostsListRequests);
}
