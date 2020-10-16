import React from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import store from './redux/store';
import ShopNavigator from './navigation/ShopNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded)
    return <AppLoading />;

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
