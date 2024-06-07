import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import colors from '../config/colors';
import getPublicRoutes from './publicRoutes';
import routes from './routes';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const shared = getPublicRoutes(Stack);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.secondary.main,
      }}
    >
      <Stack.Screen
        name={routes.WELCOME}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={LoginScreen}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={routes.REGISTER}
        component={RegisterScreen}
        options={{
          headerTitle: '',
        }}
      />
      {shared}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
