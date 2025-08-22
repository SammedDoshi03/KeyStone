import { combineReducers } from '@reduxjs/toolkit';
import { user } from './userReducer';
import { config } from './configReducer';
import { introScreenReducer } from './introScreenReducer';
import { userData } from './userDataReducer';
import { spoc } from './spocReducer';
import { asset } from './assetReducer';
import { auth } from './authReducer';
import { categoryData } from './categoryReducer';

export const rootReducer = combineReducers({
  login: user.reducer,
  intro: introScreenReducer,
  userData: userData.reducer,
  spoc: spoc.reducer,
  asset: asset.reducer,
  auth: auth.reducer,
  config: config.reducer,
  category: categoryData.reducer,
});
