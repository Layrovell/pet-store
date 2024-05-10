import { StyleSheet, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import { shadeColor } from '../utils/color';
import Typography from './Typography';
import { TypographyType } from '../interface/theme';

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

const AppButton: React.FC<Props> = ({
  title,
  onPress,
  color = colors.primary,
  size = 'sm',
  fullWidth,
  radius,
  disabled,
  isOutlined,
  variant,
}) => {
  return (
    <TouchableHighlight
      underlayColor={disabled || isOutlined ? '' : shadeColor(color, -5)}
      style={[
        styles.button,
        {
          paddingHorizontal: size === 'lg' ? 16 : size === 'md' ? 16 : 14,
          paddingVertical: size === 'lg' ? 16 : size === 'md' ? 10 : 6,
          width: fullWidth ? '100%' : 'auto',
          backgroundColor: disabled ? colors.grey[10] : color,
          borderRadius: radius ? radius : 8,
          borderColor: isOutlined ? color : 'none',
        },
        isOutlined && styles.outlined,
      ]}
      onPress={disabled ? () => {} : onPress}
    >
      <Typography
        variant={variant || 'button'}
        style={[
          {
            color: isOutlined ? color : 'white',
          },
        ]}
      >
        {title}
      </Typography>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlined: {
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default AppButton;
