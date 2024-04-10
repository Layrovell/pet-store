import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
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
import colors from './app/config/colors';
import { store } from './app/store/root/config.store';
import AppNavigator from './app/navigation/AppNavigator';
import useAuthService from './app/services/auth/service';

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

        <StatusBar animated={true} backgroundColor={colors.primary} style={Platform.OS === 'ios' ? 'light' : 'dark'} />
      </View>
    </Provider>
  );
}

const Routes = () => {
  const [isReady, setIsReady] = useState(false);
  const [loaded, error] = useFonts({
    SpaceMono: require('./app/assets/fonts/ZillaSlabHighlight-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.log('error');
    }
  }, [error]);

  const { isAuthenticated, data: user, error: authError, userLoading, userError, getUser } = useAuthService();

  const fetchUser = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      getUser(storedToken);
    }
    setIsReady(true); // Tell the application to render
  };

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isReady]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </>
  );
}
