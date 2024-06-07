import routes from 'navigation/routes';

export type RootStackParamList = {
  [routes.CATALOGUE]: { categoryId: number };
  [routes.PRODUCTS]: { categoryId: number };
  [routes.PRODUCT_DETAILS]: { productId: number };
  [routes.CART_DETAILS]: undefined;
  [routes.ACCOUNT]: undefined;
  [routes.PRIVACY_POLICY]: undefined;
  [routes.SECURITY]: undefined;
  [routes.CHANGE_PASSWORD]: undefined;
  [routes.CHANGE_EMAIL]: undefined;
  [routes.ERROR_SCREEN]: undefined;
  [routes.HOME]: undefined;
  [routes.SETTINGS]: undefined;
};
