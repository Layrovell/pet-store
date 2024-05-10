import { DefaultTheme } from '@react-navigation/native';
import colors from '../config/colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.secondary.main, // isn't apply to Back buttons
    background: colors.white,
  },
};
