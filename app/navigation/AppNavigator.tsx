import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import routes from './routes';
import { Text, View } from 'react-native';
import DummyScreen from '../screens/DummyScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='DummyScreen'
        component={DummyScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='ListingEdit'
        component={DummyScreen}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name='plus-circle'
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name='Account'
        component={DummyScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='account' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
