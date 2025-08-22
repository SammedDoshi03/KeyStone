import { all, fork } from 'redux-saga/effects';
import userDataSaga from './userDataSaga';
import spocSaga from './spocSaga';
import assetSaga from './assetSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([
    fork(userDataSaga),
    fork(spocSaga),
    fork(assetSaga),
    fork(authSaga),
  ]);
}
