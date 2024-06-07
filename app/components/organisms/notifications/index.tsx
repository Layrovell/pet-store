import { StyleSheet } from 'react-native';
import React from 'react';

import { NotificationType } from 'controllers/app/slice';
import useAppService from 'controllers/app/service';
import Snackbar from '@components/atoms/snackbar';
import Stack from '@components/Stack';

type Props = {
  position?: 'top' | 'bottom';
};

const Notifications: React.FC<Props> = ({ position = 'top' }) => {
  const { notifications, removeNotification } = useAppService();

  const removeNotificationHandler = (notification: NotificationType) => {
    removeNotification({ key: notification.key });
  };

  return (
    <Stack spacing={2} style={[styles.container, position === 'top' ? styles.topContainer : styles.bottomContainer]}>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.key}
          notification={notification}
          status='error'
          removeNotificationHandler={() => removeNotificationHandler(notification)}
        />
      ))}
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    left: '20%',
    right: 0,
  },
  topContainer: {
    top: 48,
  },
  bottomContainer: {
    bottom: 8,
  },
});

export default Notifications;
