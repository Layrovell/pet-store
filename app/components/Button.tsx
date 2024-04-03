import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import colors from '../config/colors';
import { shadeColor } from '../utils/color';

interface Props {
  title: string;
  onPress: () => void;
  color?: keyof typeof colors;
}

const AppButton: React.FC<Props> = ({ title, onPress, color = 'primary' }) => {
  return (
    <TouchableHighlight
      underlayColor={shadeColor(colors[color], -5)}
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;
