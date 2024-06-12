import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import useCartService from 'controllers/basket/service';

import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import { store } from './app/store/config.store';
import AppNavigator from './app/navigation/AppNavigator';
import useAuthService from './app/controllers/auth/service';
import { Mode, ThemeContext } from './app/context/ThemeContext';
import { getTheme } from './app/config/UI/helpers';
// import Notifications from '@organisms/notifications';

// Before rendering any navigation stack
// import { useScreens } from 'react-native-screens';
// useScreens();

// Prevent the splash screen from auto-hiding before asset loading is complete.
// Keep the splash screen visible while we fetch resources.
// SplashScreen.preventAutoHideAsync();

export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </Provider>

      <StatusBar animated={true} style={'dark'} />
    </NavigationContainer>
  );
}

const Routes = () => {
  const { data: user } = useAuthService();
  const [loaded, error] = useFonts({
    SpaceMono: require('./app/assets/fonts/ZillaSlabHighlight-Regular.ttf'),
    PrimaryBold: require('./app/assets/fonts/Poppins-Bold.ttf'),
    PrimarySemiBold: require('./app/assets/fonts/Poppins-SemiBold.ttf'),
    PrimaryThin: require('./app/assets/fonts/Poppins-Thin.ttf'),
    PrimaryLight: require('./app/assets/fonts/Poppins-Light.ttf'),
    PrimaryMedium: require('./app/assets/fonts/Poppins-Medium.ttf'),
    PrimaryRegular: require('./app/assets/fonts/Poppins-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [mode, setMode] = React.useState<Mode>('light');

  // const navigation = useNavigation();
  // const { setCartDataFromLocalStorage } = useCartService();

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);
  };

  useEffect(() => {
    const initializeCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cartData');
        if (cartData) {
          // setCartDataFromLocalStorage(JSON.parse(cartData));
        }
      } catch (error) {
        console.log('Error initializing cart data:', error);
      }
    };

    initializeCartData();
  }, []);

  useEffect(() => {
    if (error) {
      console.log('error');
    }
  }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ mode, toggleMode }}>
        <ApplicationProvider {...eva} theme={{ ...eva[mode], ...getTheme() }}>
          {/* Comment until we need it */}
          {/* <RedirectHandler navigation={navigation} /> */}
          {/* <Notifications /> */}
          {user ? <AppNavigator /> : <AuthNavigator />}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}
