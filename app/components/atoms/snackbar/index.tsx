import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React, { useState, useEffect } from 'react';

import Typography from '@components/Typography';
import { getSnackBarStatusColor } from 'utils/theme';

type Props = {
  message: string;
  status?: 'success' | 'error' | 'warning' | 'info';
  actionText?: string;
  duration?: number;
  position?: string;
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<ViewStyle>;
  actionTextStyle?: StyleProp<ViewStyle>;
  textColor?: string;
  actionTextColor?: string;
};

const Snackbar: React.FC<Props> = ({
  message,
  status,
  actionText = 'Dismiss',
  duration = 3000,
  position = 'bottom',
  containerStyle,
  messageStyle,
  actionTextStyle,
  textColor = 'white',
  actionTextColor = 'white',
}: any) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  return isVisible ? (
    <View
      style={[
        styles.container,
        position === 'top' ? styles.topContainer : styles.bottomContainer,
        containerStyle,
        { backgroundColor: getSnackBarStatusColor(status) },
      ]}
    >
      <Typography style={[styles.message, messageStyle, { color: textColor }]}>{message}</Typography>
      {actionText && (
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Typography style={[styles.actionText, actionTextStyle, { color: actionTextColor }]}>{actionText}</Typography>
        </TouchableOpacity>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 0,
    width: '90%',
    marginHorizontal: 12,
  },
  message: {
    width: '80%',
  },
  topContainer: {
    top: 8,
  },
  bottomContainer: {
    bottom: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Snackbar;
