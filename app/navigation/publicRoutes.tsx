import React from 'react';

import ErrorScreen from 'screens/ErrorScreen';
import routes from './routes';

const getPublicRoutes = (Stack: any) => {
  return [
    <Stack.Screen
      options={{ headerTitle: '' }}
      name={routes.ERROR_SCREEN}
      component={ErrorScreen}
    />,
  ];
};

export default getPublicRoutes;
