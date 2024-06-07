import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import React, { useState, useEffect } from 'react';

import Typography from '@components/Typography';
import { getSnackBarStatusColor } from 'utils/theme';
import { NotificationType } from 'controllers/app/slice';

type Props = {
  notification: NotificationType;
  status?: 'success' | 'error' | 'warning' | 'info';
  actionText?: string;
  duration?: number;
  position?: string;
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<ViewStyle>;
  actionTextStyle?: StyleProp<ViewStyle>;
  textColor?: string;
  actionTextColor?: string;
  removeNotificationHandler?: () => void;
};

const Snackbar: React.FC<Props> = ({
  notification,
  status,
  actionText = 'Dismiss',
  duration = 8000,
  containerStyle,
  messageStyle,
  actionTextStyle,
  textColor = 'white',
  actionTextColor = 'white',
  removeNotificationHandler,
}: any) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        removeNotificationHandler && removeNotificationHandler();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, duration]);

  return isVisible ? (
    <View
      style={[
        styles.container,
        containerStyle,
        { backgroundColor: getSnackBarStatusColor(status) },
      ]}
    >
      <Typography style={[styles.message, messageStyle, { color: textColor }]}>{notification.message}</Typography>
      {actionText && (
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
            removeNotificationHandler && removeNotificationHandler();
          }}
        >
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
    zIndex: 1,
    width: '90%',
    alignSelf: 'flex-end',
  },
  message: {
    width: '80%',
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default Snackbar;
