import React, { createRef } from 'react';

export const navigationRef: any = createRef();

const navigate = (name: any, params?: any) => {
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate,
};
