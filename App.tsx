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
import colors from './app/config/colors';
import { store } from './app/store/root/config.store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
// Keep the splash screen visible while we fetch resources.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    SpaceMono: require('./app/assets/fonts/ZillaSlabHighlight-Regular.ttf'),
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
    <Provider store={store}>
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {/* <NavigationContainer ref={navigationRef} theme={navigationTheme}> */}
          {/* <Text>Open up App.tsx to start working on your app! ===</Text> */}
          <AuthNavigator />
          {/* <StatusBar style='auto' /> */}
          {/* {user ? <AppNavigator /> : <AuthNavigator />} */}
        </NavigationContainer>
      </GestureHandlerRootView>

      <StatusBar animated={true} backgroundColor={colors.primary} style={Platform.OS === 'ios' ? 'light' : 'dark'} />
    </View>
    </Provider>
  );
}
