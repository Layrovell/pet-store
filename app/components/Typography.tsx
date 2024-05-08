import React from 'react';
import { Text } from 'react-native';

import { TypographyType } from '../interface/theme';
import colors from '../config/colors';

const variantStyles = {
  body1: {
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'PrimaryLight',
  },
  body3: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'PrimaryLight',
    color: colors.grey[30],
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'PrimaryBold',
    textTransform: 'capitalize',
  },
  h1: {
    fontSize: 38,
    lineHeight: 40,
    fontFamily: 'PrimarySemiBold',
  },
  h2: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'PrimarySemiBold',
  },
  h3: {
    fontSize: 28,
    lineHeight: 36,
  },
  h4: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'PrimaryBold',
  },
  h5: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PrimarySemiBold',
  },
  // caption etc.
};

interface Props {
  children: any;
  variant?: TypographyType;
  color?: string;
  style?: any;
  textAlign?: 'center' | 'left' | 'right';
}

const Typography: React.FC<Props> = ({ children, variant = 'body1', color, textAlign, style }) => {
  const variantStyle = variantStyles[variant] || variantStyles.body1;

  return (
    <Text style={[variantStyle, { color: color || (variantStyle as any)?.color, textAlign }, style]}>{children}</Text>
  );
};

export default Typography;
