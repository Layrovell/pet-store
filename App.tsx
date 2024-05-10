import 'react-native-gesture-handler';
import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import { navigationRef } from './app/navigation/rootNavigation';
import { store } from './app/store/root/config.store';
import AppNavigator from './app/navigation/AppNavigator';
import useAuthService from './app/features/auth/service';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// Keep the splash screen visible while we fetch resources.
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
            <Routes />
          </NavigationContainer>
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
    <>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </>
  );
}
