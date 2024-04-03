import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: 'dodgerblue' },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          // for single Screen
          // headerStyle: { backgroundColor: 'tomato' },
          // headerTintColor: 'white',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          headerStyle: { backgroundColor: colors.primary },
        }}
        // options={({ route }: any) => ({ title: `Something ${route?.params?.id}` })}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          headerStyle: { backgroundColor: colors.secondary },
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
