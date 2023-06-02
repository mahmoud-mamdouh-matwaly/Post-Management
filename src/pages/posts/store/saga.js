import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { execute } from 'services';
import { showError, showAlert } from 'utils/utility-sagas';

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
  setSearchTerm,
  setSearchTermSuccess,
  deletePostItem,
  deletePostItemSuccess,
  deletePostItemFailed,
} from './slice';

import {
  getPostsRequest,
  getPostItemRequest,
  getUpdatePostItemRequest,
  getDeletePostItemRequest,
} from 'services/request-creators/posts';

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
    yield showAlert({
      message: 'This operation is Successfully',
      type: 'success',
    });
  } catch (error) {
    yield put(updatePostItemFailed());
    yield showError(error);
  }
}

function* handleSearchPosts(action) {
  yield delay(500);
  yield put(setSearchTermSuccess(action.payload));
}

function* handleDeletePostItemRequests(action) {
  const { id } = action.payload;
  try {
    yield call(execute, getDeletePostItemRequest({ id }));

    yield showAlert({
      message: 'This operation is Successfully',
      type: 'success',
    });
    yield put(deletePostItemSuccess(id));
  } catch (error) {
    yield put(deletePostItemFailed());
    yield showError(error);
  }
}
export function* watchPostsListPageRequests() {
  yield takeLatest(fetchPosts.type, handlePostsListRequests);
  yield takeLatest(fetchPostItem.type, handlePostItemRequests);
  yield takeLatest(updatePostItem.type, handleUpdatePostItemRequests);
  yield takeLatest(setSearchTerm.type, handleSearchPosts);
  yield takeLatest(deletePostItem.type, handleDeletePostItemRequests);
}
