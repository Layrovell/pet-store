import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import navigationTheme from './app/navigation/navigationTheme';
import { navigationRef } from './app/navigation/rootNavigation';

export default function App() {
  return (
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
    </View>
  );
}
