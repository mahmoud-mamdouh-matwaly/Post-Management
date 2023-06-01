import { takeLatest, put, call } from 'redux-saga/effects';
import { execute } from 'services';
import { showError } from 'utils/utility-sagas';

import {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailed,
  fetchPostItem,
  fetchPostItemSuccess,
  fetchPostItemFailed,
  updatePostItem,
  updatePostItemSuccess,
  updatePostItemFailed,
} from './slice';

import { getPostsRequest, getPostItemRequest, getUpdatePostItemRequest } from 'services/request-creators/posts';

function* handlePostsListRequests() {
  try {
    const { data } = yield call(execute, getPostsRequest());

    yield put(fetchPostsSuccess(data));
  } catch (error) {
    yield put(fetchPostsFailed());
    yield showError(error);
  }
}

function* handlePostItemRequests(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(execute, getPostItemRequest({ id }));

    yield put(fetchPostItemSuccess(data));
  } catch (error) {
    yield put(fetchPostItemFailed());
    yield showError(error);
  }
}

function* handleUpdatePostItemRequests(action) {
  const { id, values } = action.payload;
  try {
    const { data } = yield call(execute, getUpdatePostItemRequest({ id, values }));

    yield put(updatePostItemSuccess(data));
  } catch (error) {
    yield put(updatePostItemFailed());
    yield showError(error);
  }
}
export function* watchPostsListPageRequests() {
  yield takeLatest(fetchPosts.type, handlePostsListRequests);
  yield takeLatest(fetchPostItem.type, handlePostItemRequests);
  yield takeLatest(updatePostItem.type, handleUpdatePostItemRequests);
}
