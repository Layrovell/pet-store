import React from 'react';
import { StyleSheet, View } from 'react-native';
// @ui-kitten
import { Button as UIButton, ButtonProps, Spinner } from '@ui-kitten/components';

interface Props extends ButtonProps {
  loading?: boolean;
}

const LoadingIndicator = (props: ButtonProps): React.ReactElement => {
  return (
    <View style={styles.indicator}>
      <Spinner size='small' status={props?.appearance === 'outline' ? 'primary' : 'basic'} />
    </View>
  )
};

const Button: React.FC<Props> = (props) => {
  return (
    <UIButton
      accessoryLeft={props?.loading ? <LoadingIndicator {...props} /> : props?.accessoryLeft}
      {...props}
    >
      {props?.children}
    </UIButton>
  );
};

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
