import { call, put, takeEvery } from 'redux-saga/effects';
import { logOut, passUpdate, userLogin } from '../../firebase/authentication';
import { loginSagaSuccess, logoutSagaSuccess } from '../reducers/authReducer';

function* workLogout() {
  console.log('workLogout');
  //@ts-ignore
  const res = yield call(() => {
    return logOut();
  });
  yield put(logoutSagaSuccess(res));
}

function* workPasswordUpdateSaga({ payload }) {
  //@ts-ignore
  const res = yield call(() => {
    passUpdate(payload.password);
  });
}

function* workUserLoginSaga({ payload }) {
  console.log('saga pre = ', payload);
  //@ts-ignore
  const res = yield call(() => {
    return userLogin(payload.email, payload.password);
  });
  console.log('saga res = ', res);
  yield put(loginSagaSuccess(res));
}

function* workTest() {
  console.log('test');
}

function* authSaga() {
  //@ts-ignore
  yield takeEvery('auth/logoutSaga', workLogout);
  //@ts-ignore
  yield takeEvery('auth/passwordUpdateSaga', workPasswordUpdateSaga);
  //@ts-ignore
  yield takeEvery('auth/loginSaga', workUserLoginSaga);
  //@ts-ignore
  yield takeEvery('auth/test', workTest);
}

export default authSaga;
