import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import { shadeColor } from '../utils/color';

interface Props {
  title: string;
  onPress: () => void;
  color?: string;
  size?: 'md' | 'sm' | 'lg';
  fullWidth?: boolean;
  radius?: number;
  disabled?: boolean;
}

const AppButton: React.FC<Props> = ({
  title,
  onPress,
  color = colors.primary,
  size = 'sm',
  fullWidth,
  radius,
  disabled,
}) => {
  return (
    <TouchableHighlight
      underlayColor={disabled ? '' : shadeColor(color, -5)}
      style={[
        styles.button,
        {
          paddingHorizontal: size === 'lg' ? 16 : size === 'md' ? 16 : 14,
          paddingVertical: size === 'lg' ? 14 : size === 'md' ? 10 : 6,
          width: fullWidth ? '100%' : 'auto',
          backgroundColor: disabled ? colors.grey[10] : color,
          borderRadius: radius ? radius : 8,
        },
      ]}
      onPress={disabled ? () => {} : onPress}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: size === 'lg' ? 18 : 'md' ? 14 : 10,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});

export default AppButton;
