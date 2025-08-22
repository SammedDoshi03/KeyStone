import { call, put, takeEvery } from 'redux-saga/effects';
import { getUserCount } from '../../firebase/empFetch';
import userFetch, { userIdFetch } from '../../firebase/userFetch';
import {
  fetchUserCount,
  fetchUserIdSuccess,
  fetchUserSuccess,
} from '../reducers/userDataReducer';

function* workFetchUser() {
  const user = yield call(() => {
    return userFetch();
  });
  yield put(fetchUserSuccess(user._data));
}
function* workFetchUserId() {
  const user = yield call(() => {
    return userIdFetch();
  });
  yield put(fetchUserIdSuccess(user));
}

function* workFetchUserCount({ payload }) {
  const user = yield call(() => {
    return getUserCount(payload.location);
  });
  yield put(fetchUserCount(user));
}

function* userDataSaga() {
  yield takeEvery('userData/fetchUser', workFetchUser);

  //@ts-ignore
  yield takeEvery('userData/fetchUserCountValue', workFetchUserCount);

  yield takeEvery('userData/fetchUserId', workFetchUserId);
}

export default userDataSaga;
