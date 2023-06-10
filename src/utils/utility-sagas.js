import { put, delay } from 'redux-saga/effects';
import { showAlert as showAlertActionCreator, clearFirstAlertData } from 'store/slices/ui-slice';
import { isNetworkError } from 'utils';

export function* hideAlert() {
  yield delay(2500);
  yield put(clearFirstAlertData());
}

export function* showAlert({ type, message }) {
  yield put(showAlertActionCreator({ type, message }));
  yield hideAlert();
}

export function* showError(error, customMessage) {
  const type = isNetworkError(error) ? 'network error' : 'error';
  let message = isNetworkError(error)
    ? "You don't seem to be connected to the internet, please check your connection and try again"
    : customMessage || error?.message;

  yield showAlert({ type, message });
}
