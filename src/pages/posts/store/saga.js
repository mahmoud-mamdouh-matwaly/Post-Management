import { takeLatest, put, call } from 'redux-saga/effects';
import { execute } from 'services';

import { fetchPosts, fetchPostsSuccess } from './slice';

import { getPostsRequest } from 'services/requestCreators/posts';

function* handleFetchPostsListRequests() {
  try {
    const { data } = yield call(execute, getPostsRequest());

    yield put(fetchPostsSuccess(data));
  } catch (error) {
    console.log('🚀 ~ file: saga.js:22 ~ function*handleFetchPostsListRequests ~ error:', error);
  }
}

export function* watchPostsPageRequests() {
  yield takeLatest(fetchPosts.type, handleFetchPostsListRequests);
}
