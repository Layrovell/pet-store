import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import { shadeColor } from '../utils/color';

interface Props {
  title: string;
  onPress: () => void;
  color?: keyof typeof colors;
  size?: 'md' | 'sm' | 'lg';
  fullWidth?: boolean;
}

const AppButton: React.FC<Props> = ({ title, onPress, color = 'primary', size = 'sm', fullWidth }) => {
  return (
    <TouchableHighlight
      underlayColor={shadeColor(colors[color], -5)}
      style={[
        styles.button,
        {
          paddingHorizontal: size === 'lg' ? 16 : size === 'md' ? 16 : 14,
          paddingVertical: size === 'lg' ? 14 : size === 'md' ? 10 : 6,
          width: fullWidth ? '100%' : 'auto',
          backgroundColor: colors[color],
        },
      ]}
      onPress={onPress}
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
    borderRadius: 25,
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
