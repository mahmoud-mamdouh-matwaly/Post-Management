import { configureStore } from '@reduxjs/toolkit';
import saga from './root-saga';
import createRootReducer from './root-reducers';
import sagaMiddleware, { runSaga } from './middlewares/sagaMiddleware';

let _lastTask;
const _runSaga = () => {
  if (_lastTask) {
    _lastTask.cancel();
  }

  _lastTask = runSaga(saga);
};

const getStore = () => {
  const middleware = getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
  const store = configureStore({ reducer: createRootReducer(), middleware });

  _runSaga();
  return store;
};

export default getStore;
