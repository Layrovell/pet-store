import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ProductFiltersContextProvider } from 'context/ProductFiltersContext';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import PageHeaderNavigation from '@components/organisms/pageNavigation';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AccountScreen from '../screens/AccountScreen';
import Icon from '../components/atoms/Icon';
import ProductsScreen from '../screens/ProductsScreen';
import CatalogueScreen from 'screens/CatalogueScreen';
import routes from './routes';
import { RootStackParamList } from '@type/navigation';
import useCartService from 'controllers/basket/service';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function MainStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        header({ route, options }) {
          return (
            <PageHeaderNavigation
              routeName={options?.title || route.name}
              leftAction={<Icon isAction name='bell-outline' size={26} onPress={() => console.log(123)} />}
              rightAction={<Icon isAction name='shopping-cart-outline' size={26} />}
            />
          );
        },
      }}
    >
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
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

const tabArr = [
  {
    route: routes.HOME_TAB,
    initialRoute: routes.HOME,
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
    label: 'Home',
  },
  {
    route: routes.CATALOGUE_TAB,
    initialRoute: routes.CATALOGUE,
    activeIcon: 'grid',
    inactiveIcon: 'grid-outline',
    label: 'Catalogue',
  },
  {
    route: routes.CART_TAB,
    initialRoute: routes.CART_DETAILS,
    activeIcon: 'shopping-cart',
    inactiveIcon: 'shopping-cart-outline',
    label: 'Grid',
  },
  {
    route: routes.SETTINGS_TAB,
    initialRoute: routes.SETTINGS,
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
    label: 'Home Page',
  },
];

const TabBarButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const { totalCount } = useCartService();

  const focused = accessibilityState.selected;
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(focused ? 1.1 : 0.9) }],
    };
  }, [focused]);

  const animatedStyleCount = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    scale.value = withTiming(0.4, { duration: 200, easing: Easing.out(Easing.exp) }, () => {
      scale.value = withTiming(1.2, { duration: 200, easing: Easing.out(Easing.exp) }, () => {
        scale.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.exp) });
      });
    });
  }, [totalCount]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.4}>
      <Animated.View style={rStyle}>
        <Icon name={focused ? item.activeIcon : item.inactiveIcon} fill={'orange'} size={26} />
        {item.route === routes.CART_TAB && totalCount > 0 && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: '50%',
                left: '15%',
                backgroundColor: '#251B37',
                width: 18,
                height: 18,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              },
              animatedStyleCount,
            ]}
          >
            <Animated.Text style={{ color: 'white', fontSize: 10 }}>{totalCount}</Animated.Text>
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

function TabNavigationScreen() {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME}
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 16,
        },
      })}
    >
      {tabArr.map((item) => {
        return (
          <Tab.Screen
            key={item.route}
            name={item.route}
            component={MainStackScreen}
            initialParams={{ screen: item.initialRoute }}
            options={{
              tabBarButton: (props) => <TabBarButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigationScreen;
