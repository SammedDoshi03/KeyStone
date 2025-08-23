import { call, put, takeEvery } from 'redux-saga/effects';
import addSpoc from '../../firebase/addSpoc';
import displayAllCategories, {
  displayAllSubCategories,
} from '../../firebase/category';
import {
  getDetails,
  getSPOC,
  getSPOCAmount,
} from '../../firebase/manageSpoc';
import {
  fetchCategoryDetails,
  fetchSubCategorySuccess,
} from '../reducers/categoryReducer';
import {
  addSpocSuccess,
  fetchSpocAmountSuccess,
  fetchSpocDetailsSuccess,
  fetchSpocSuccess,
} from '../reducers/spocReducer';

function* workAddSpoc({ payload }) {
  const res = yield call(() => {
    return addSpoc(
      payload.email,
      payload.startDate,
      payload.endDate,
      payload.location,
    );
  });
  yield put(addSpocSuccess(res));
}

function* workFetchSpocAmount() {
  const res = yield call(() => {
    return getSPOCAmount();
  });
  yield put(fetchSpocAmountSuccess(res));
}

function* workFetchSpoc({ payload }) {
  const res = yield call(() => {
    return getSPOC(payload.email);
  });
  yield put(fetchSpocSuccess(res));
}

function* workFetchSpocDetails({ payload }) {
  const res = yield call(() => {
    return getDetails(payload.id);
  });
  yield put(fetchSpocDetailsSuccess(res._data));
}

function* workFetchCategoryDetails() {
  const res = yield call(() => {
    return displayAllCategories();
  });
  console.log('saga res', res);
  yield put(fetchCategoryDetails(res));
}

function* workFetchSubCategoryDetails({ payload }) {
  const res = yield call(() => {
    return displayAllSubCategories(payload.path);
  });
  yield put(fetchSubCategorySuccess(res));
}

function* spocSaga() {
  //@ts-ignore
  yield takeEvery('spoc/addSpoc', workAddSpoc);

  yield takeEvery('spoc/fetchSpocAmount', workFetchSpocAmount);
  //@ts-ignore
  yield takeEvery('spoc/fetchSpoc', workFetchSpoc);
  //@ts-ignore
  yield takeEvery('spoc/fetchSpocDetails', workFetchSpocDetails);
  //@ts-ignore
  yield takeEvery('categoryData/fetchCategory', workFetchCategoryDetails);
  //@ts-ignore
  yield takeEvery('categoryData/fetchSubCategory', workFetchSubCategoryDetails);
}

export default spocSaga;
