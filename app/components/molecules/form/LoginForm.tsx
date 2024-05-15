import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import Icon from '../../atoms/Icon';
import { ErrorMessage, FormField } from '../../forms';
import Stack from '../../Stack';

interface Props {
  formError?: string;
}

const LoginForm: React.FC<Props> = ({ formError }) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Stack spacing={4} style={{ marginBottom: 36 }}>
      <ErrorMessage error={formError} visible={!!formError} />
      <FormField
        name='email'
        label={'Email'}
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress' // iOS
        // onChangeText={handleChange("email")}
        // onBlur={() => setFieldTouched('email')}
      />
      <FormField
        name='password'
        label={'Password'}
        autoCapitalize='none'
        textContentType='password' // iOS
        secureTextEntry={secureTextEntry}
        accessoryRight={renderIcon}
      />
    </Stack>
  );
};

export default LoginForm;
