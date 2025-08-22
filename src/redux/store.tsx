import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga/rootSaga';
import { rootReducer } from './reducers';

// 1. Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Note: You are blacklisting almost everything.
  // Consider using `whitelist` to only save specific reducers.
  blacklist: ['userData', 'spoc', 'asset', 'auth', 'category'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure the store with the latest middleware syntax
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Correctly handle non-serializable data from redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware), // Add saga middleware here
});

// 4. Run the combined rootSaga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// (Recommended) Export types for your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
