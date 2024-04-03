import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TextInput, View, StyleSheet, DimensionValue } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

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
}

const AppTextInput: React.FC<Props> = ({ icon, width = '100%', ...otherProps }) => {
  const [isFieldVisible, setIsFieldVisible] = useState(true);

  const toggleFieldVisibility = () => {
    setIsFieldVisible((prev) => !prev);
  };

  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <TouchableWithoutFeedback onPress={() => {}}>
          <MaterialIcons
            onPress={() => otherProps?.secureTextEntry && toggleFieldVisibility()}
            name={icon}
            size={20}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      )}
      <TextInput
        // onChangeText={(text) => setFirstName(text)}
        // keyboardType="numeric"
        // clearButtonMode="always" // iOS
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text} // styles.textInput
        {...otherProps}
        secureTextEntry={isFieldVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
