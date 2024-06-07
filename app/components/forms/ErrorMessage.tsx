import React from 'react';

import Snackbar from '@components/atoms/snackbar';
import { NotificationType } from 'controllers/app/slice';

interface Props {
  error?: NotificationType[];
  visible?: boolean;
  status?: 'success' | 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<Props> = ({ error, status }) => {
  if (!error) return null;

  return (
    <>
      {error?.map((err, idx) => (
        <Snackbar
          key={idx}
          notification={err}
          duration={5000}
          position='top' // 'top'/'bottom'
          status={status}
        />
      ))}
    </>
  );
};

export default ErrorMessage;
