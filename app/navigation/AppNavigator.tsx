import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import DummyScreen from '../screens/DummyScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import colors from '../config/colors';

const ICON_SIZE = 28;

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
        headerShown: true, // for mode="modal"
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen name='Browse' component={DummyScreen} options={{ headerTitleAlign: 'center' }} />
      <Stack.Screen
        name='ProductDetails'
        options={{
          headerTitle: 'Product Details',
        }}
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: true,
        headerTitleAlign: 'center',
        headerMode: 'screen',
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
      initialRouteName='Settings'
    >
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='Account' component={AccountScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 80,
          paddingBottom: 16,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        // headerMode: 'screen',
        // ...TransitionPresets.ModalSlideFromBottomIOS,
      })}
    >
      <Tab.Screen
        name='Home'
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='home-variant' size={ICON_SIZE} color={color} />
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='cart-outline' size={ICON_SIZE} color={color} />,
        })}
      />
      <Tab.Screen
        name='SettingsScreen'
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='account-outline' size={ICON_SIZE} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
