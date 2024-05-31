export const getTabBarIconName = (route: any, focused: boolean, routes: any) => {
  let iconName;
  if (route.name === routes.HOME_TAB) {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === routes.CATALOGUE_TAB) {
    iconName = focused ? 'grid' : 'grid-outline';
  } else if (route.name === routes.CART_TAB) {
    iconName = focused ? 'shopping-cart' : 'shopping-cart-outline';
  } else if (route.name === routes.SETTINGS_TAB) {
    iconName = focused ? 'person' : 'person-outline';
  } else {
    iconName = focused ? 'menu-2-outline' : 'menu-2-outline';
  }

  return iconName;
};
