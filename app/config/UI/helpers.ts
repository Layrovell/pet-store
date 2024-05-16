import { baseTheme } from './themes/baseTheme';

export enum ThemeEnum {}

export const getTheme = (key?: ThemeEnum) => {
  switch (key) {
    default:
      return baseTheme;
  }
};
