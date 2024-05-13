import { StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import Typography from './Typography';
import { TypographyType } from '../interface/theme';
import { firstUpperLetter } from '../utils/stringFormatter';

interface Props {
  title: string;
  onPress: () => void;
  color?: string;
  size?: 'md' | 'sm' | 'lg';
  fullWidth?: boolean;
  radius?: number;
  disabled?: boolean;
  isOutlined?: boolean;
  variant?: TypographyType;
}

const sizeStyles = {
  sm: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 14 },
  md: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
  lg: { paddingVertical: 15, paddingHorizontal: 30, fontSize: 18 },
};

const AppButton: React.FC<Props> = ({
  title,
  onPress,
  color = colors.secondary.main,
  size = 'sm',
  fullWidth,
  radius,
  disabled,
  isOutlined,
  variant,
}) => {
  const styleProps = {
    title,
    color,
    radius,
    disabled,
    isOutlined,
    fullWidth,
    size,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles(styleProps).button, sizeStyles[size] || sizeStyles.sm]}
      onPress={disabled ? () => {} : onPress}
    >
      <Typography variant={variant || 'button'} style={[styles(styleProps).text]}>
        {firstUpperLetter(title)}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = (props: Partial<Props>) =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: props?.radius || 0,
      backgroundColor: props?.disabled ? colors.grey[10] : props?.isOutlined ? 'transparent' : props?.color,
      borderColor: props?.color,
      borderWidth: props?.isOutlined ? 2 : 0,
      width: props?.fullWidth ? '100%' : 'auto',
      opacity: props?.disabled ? 0.8 : 1,
    },
    text: {
      color: props?.isOutlined ? props?.color : '#fff',
      fontSize: sizeStyles?.[props?.size!]?.fontSize,
    },
  });

export default AppButton;
