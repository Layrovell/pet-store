import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {
  visible: boolean;
  width?: number;
  height?: number;
}

const AppActivityIndicator: React.FC<Props> = ({ visible = false, width = 120, height = 120 }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../assets/animations/loader.json')}
        style={{ width, height }}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    opacity: 0.6,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppActivityIndicator;
