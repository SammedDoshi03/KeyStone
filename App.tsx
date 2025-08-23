import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import './src/i18n';
import RNBootSplash from 'react-native-bootsplash';
import AuthStack from './src/navigations/AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { AccessibilityInfo } from 'react-native';
import { setTheme } from './src/redux/reducers/themeSlice';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      dispatch(setTheme(isEnabled ? 'highContrast' : 'default'));
    };

    checkScreenReader();

    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      isEnabled => {
        dispatch(setTheme(isEnabled ? 'highContrast' : 'default'));
      },
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return <AppNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
