import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import PageHeaderNavigation from '@components/organisms/pageNavigation';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import Icon from '../components/atoms/Icon';
import ProductsScreen from '../screens/ProductsScreen';
import { Tabs } from '@type/navigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    // mode ('modal'/'card') isn't working
    // modal - slide appears from bottom, card - from right
    <Stack.Navigator
      // mode='modal' // mode='card' - default
      screenOptions={{
        //   headerStyle: {
        //     backgroundColor: 'blue',
        //     shadowOpacity: 0,
        //   },
        //   headerBackTitle: 'back',
        //   headerBackTitleStyle: {
        //     fontWeight: 'bold',
        //   },
        // }}
        headerTitleAlign: 'center',
        // animationEnabled: true,
        gestureEnabled: false,
        headerShown: true, // for mode="modal"
        header({ route }) {
          return <PageHeaderNavigation routeName={route.name} />;
        },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          header({ route }) {
            return (
              <PageHeaderNavigation
                routeName={route.name}
                leftAction={<Icon name='bell-outline' size={26} />}
                rightAction={<Icon name='shopping-bag-outline' size={26} />}
              />
            );
          },
        }}
      />
      <Stack.Screen
        options={{
          header({ route, navigation }) {
            return (
              <PageHeaderNavigation
                search
                leftAction={<Icon onPress={() => navigation.goBack()} name='arrow-back-outline' size={26} />}
                rightAction={<Icon name='shopping-bag-outline' size={26} />}
              />
            );
          },
        }}
        name='Products'
        component={ProductsScreen}
      />
      <Stack.Screen name='Product' options={{ headerTitle: 'Product' }} component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        header({ route }) {
          return <PageHeaderNavigation routeName={route.name} />;
        },
      }}
    >
      <Stack.Screen name='Cart' component={CartScreen} options={{ headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerTitleAlign: 'center',
        header({ route, navigation }) {
          return (
            <PageHeaderNavigation
              routeName={route.name}
              leftAction={route.name !== 'Settings' ? <Icon onPress={() => navigation.goBack()} name='arrow-back-outline' size={26} /> : <></>}
            />
          );
        },
      }}
      initialRouteName='Settings'
    >
      <Stack.Screen name='Settings' component={SettingsScreen} />
      <Stack.Screen name='Account' component={AccountScreen} />
    </Stack.Navigator>
  );
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          paddingBottom: 16,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === Tabs.HOME) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === Tabs.CART) {
            iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
          } else if (route.name === Tabs.SETTINGS) {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = focused ? 'behance' : 'behance-outline';
          }

          const iconColor = focused ? color : 'black';
          const iconSize = focused ? 32 : size;
          return <Icon name={iconName} size={iconSize} fill={iconColor} />;
        },
      })}
    >
      <Tab.Screen name={Tabs.HOME} component={HomeStack} options={{ tabBarLabel: 'Home Page' }} />
      <Tab.Screen name={Tabs.CART} component={CartStack} options={{ tabBarLabel: 'Cart Page' }} />
      <Tab.Screen name={Tabs.SETTINGS} component={SettingsStack} options={{ tabBarLabel: 'Account' }} />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
