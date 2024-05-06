import { useState } from 'react';
import { TextInput, StyleSheet, DimensionValue } from 'react-native';

import defaultStyles from '../config/styles';
import Stack from './Stack';
import colors from '../config/colors';

interface Props {
  icon?: any;
  placeholder?: string;
  autoCapitalize?: any;
  autoCorrect?: boolean;
  keyboardType?: any;
  textContentType?: any;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  onBlur?: any;
  width?: DimensionValue;
  hideIcon?: string;
  color?: string;
}

const AppTextInput: React.FC<Props> = ({ icon, width = '100%', ...otherProps }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Stack
      style={[
        styles.container, 
        { width }, 
        isFocused ? styles.focused : null,
      ]}
    >
      <TextInput
        // onChangeText={(text) => setFirstName(text)}
        // keyboardType="numeric"
        // clearButtonMode="always" // iOS
        placeholderTextColor={colors.grey[30]}
        style={[defaultStyles.text, styles.input]}
        {...otherProps}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={otherProps?.secureTextEntry}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.grey[10],
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 22,
  },
  input: {
    // temp fix for input field type area
    width: '90%',
  },
  icon: {
    marginRight: 10,
  },
  focused: {
    borderColor: colors.secondary.main,
  },
});

export default AppTextInput;
