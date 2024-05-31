import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { ProductFiltersContextProvider } from 'context/ProductFiltersContext';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import PageHeaderNavigation from '@components/organisms/pageNavigation';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import Icon from '../components/atoms/Icon';
import ProductsScreen from '../screens/ProductsScreen';
import { Tabs } from '@type/navigation';
import CatalogueScreen from 'screens/CatalogueScreen';
import Typography from '@components/Typography';
import routes from './routes';
import { getTabBarIconName } from 'utils/getTabBarIconName';
import ErrorScreen from 'screens/ErrorScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitle(props) {
          return <Typography variant='h5'>{props?.children}</Typography>;
        },
      }}
    >
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={'ErrorScreen'} component={ErrorScreen} />
      <Stack.Screen name={routes.CATALOGUE} component={CatalogueScreen} />
      <Stack.Screen name={routes.PRODUCTS}>
        {(props) => (
          <ProductFiltersContextProvider>
            <ProductsScreen {...props} />
          </ProductFiltersContextProvider>
        )}
      </Stack.Screen>
      <Stack.Screen name={routes.PRODUCT_DETAILS} component={ProductDetailsScreen} />
      <Stack.Screen name={routes.CART_DETAILS} component={CartScreen} />
      <Stack.Screen name={routes.SETTINGS} component={SettingsScreen} />
      <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    </Stack.Navigator>
  );
}

function TabNavigationScreen() {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: { height: 80, paddingBottom: 16 },
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabBarIconName(route, focused, routes);
          const iconColor = focused ? color : 'black';
          const iconSize = focused ? 32 : size;
          return <Icon name={iconName} size={iconSize} fill={iconColor} />;
        },
      })}
    >
      <Tab.Screen
        name={routes.HOME_TAB}
        component={MainStackScreen}
        initialParams={{ screen: routes.HOME }}
        options={{ tabBarLabel: 'Home Page' }}
      />
      <Tab.Screen
        name={routes.CATALOGUE_TAB}
        component={MainStackScreen}
        initialParams={{ screen: routes.CATALOGUE }}
        options={{ tabBarLabel: 'Catalogue' }}
      />
      <Tab.Screen
        name={routes.CART_TAB}
        component={MainStackScreen}
        initialParams={{ screen: routes.CART_DETAILS }}
        options={{ tabBarLabel: 'Cart Page' }}
      />
      <Tab.Screen
        name={routes.SETTINGS_TAB}
        component={MainStackScreen}
        initialParams={{ screen: routes.SETTINGS }}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationScreen;
