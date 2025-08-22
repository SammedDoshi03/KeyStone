import { call, put, takeEvery } from 'redux-saga/effects';
import {
  addAsset,
  getAssetAllocatedUsers,
  getAssetInfo,
  removeAssets,
  updateAssetsInfo,
  updateAssetStatus,
} from '../../firebase/assets';
import {
  fetchAssetAllocatedUsersDataSuccess,
  fetchAssetAllocatedUsersSuccess,
  getAssetSuccess,
  updateAssetStatusSuccess,
} from '../reducers/assetReducer';

function* workGetAsset({ payload }) {
  //@ts-ignore
  const res = yield call(() => {
    return getAssetInfo(payload.email);
  });
  yield put(getAssetSuccess(res));
}

function* workGetUserAsset({ payload }) {
  //@ts-ignore
  const res = yield call(() => {
    return getAssetInfo(payload.email);
  });
  yield put(fetchAssetAllocatedUsersDataSuccess(res));
}

function* workUpdateAssetStatus({ payload }) {
  //@ts-ignore
  const res = yield call(() => {
    return updateAssetStatus(payload.serialNumber, payload.status);
  });
  yield put(updateAssetStatusSuccess());
}

function* workfetchAssetAllocatedUsers({ payload }) {
  //@ts-ignore
  const res = yield call(() => {
    return getAssetAllocatedUsers(payload.location);
  });
  yield put(fetchAssetAllocatedUsersSuccess(res));
}

function* workRemoveAssetStatus({ payload }) {
  //@ts-ignore
  const res = yield call(() => {
    return removeAssets(payload.email, payload.serialNumber, payload.path);
  });
}

function* workupdateAsset({ payload }) {
  // @ts-ignore
  const res = yield call(() => {
    return updateAssetsInfo(payload.email, payload.endDate, payload.index);
  });
}

function* workAddAsset({ payload }) {
  console.log('saga payload', payload);
  // @ts-ignore
  const res = yield call(() => {
    return addAsset(payload.assetData);
  });
}

function* assetSaga() {
  //@ts-ignore
  yield takeEvery('asset/getAssets', workGetAsset);
  //@ts-ignore
  yield takeEvery('asset/updateAssetStatus', workUpdateAssetStatus);
  //@ts-ignore
  yield takeEvery(
    'asset/fetchAssetAllocatedUsers',
    workfetchAssetAllocatedUsers,
  );
  //@ts-ignore
  yield takeEvery('asset/getUserAssets', workGetUserAsset);
  //@ts-ignore
  yield takeEvery('asset/removeAsset', workRemoveAssetStatus);
  //@ts-ignore
  yield takeEvery('asset/updateAsset', workupdateAsset);
  //@ts-ignore
  yield takeEvery('asset/addAssets', workAddAsset);
}

export default assetSaga;
