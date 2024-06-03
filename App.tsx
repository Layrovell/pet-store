import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import { store } from './app/store/config.store';
import AppNavigator from './app/navigation/AppNavigator';
import useAuthService from './app/controllers/auth/service';
import { Mode, ThemeContext } from './app/context/ThemeContext';
import { getTheme } from './app/config/UI/helpers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// Keep the splash screen visible while we fetch resources.
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>

        <StatusBar animated={true} style={'dark'} />
      </View>
    </Provider>
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

  const navigationRef = useNavigationContainerRef();

  const toggleMode = () => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setMode(nextMode);
  };

  useEffect(() => {
    if (error) {
      console.log('error');
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ mode, toggleMode }}>
        <ApplicationProvider {...eva} theme={{ ...eva[mode], ...getTheme() }}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </ApplicationProvider>
      </ThemeContext.Provider>
    </NavigationContainer>
  );
}
