import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import DummyScreen from '../screens/DummyScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedNavigator = () => {
  return (
    // mode ('modal'/'card') isn't working
    // modal - slide appears from bottom, card - from right
    <Stack.Navigator
      // mode='modal' // mode='card' - default
      screenOptions={{
        // animationEnabled: true,
        gestureEnabled: true,
        headerShown: false, // for mode="modal"
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name='Listings'
        component={DummyScreen}
        options={{ headerTitleAlign: 'center' }}
      />
      <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} />
      {/* <Stack.Screen name='CartDetails' component={CartScreen} /> */}
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // ...TransitionPresets.ModalSlideFromBottomIOS,
      })}
    >
      <Tab.Screen
        name='Feed'
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='CartDetails'
        component={CartScreen}
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
        component={AccountScreen}
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
