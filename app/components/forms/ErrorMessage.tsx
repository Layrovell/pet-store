import React from "react";

import Snackbar from '@components/atoms/snackbar';

interface Props {
  error?: string | string[] | null;
  visible?: boolean;
  status?: 'success' | 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<Props> = ({ error, status }) => {
  if (!error) return null;

  return (
    <>
      {Array.isArray(error) ? (
        error.map((err: string, idx) => (
          <Snackbar
            key={idx}
            message={err}
            duration={5000}
            position='top' // 'top'/'bottom'
            status={status}
          />
        ))
      ) : (
        <Snackbar message={error} duration={5000} position='top' status={status} />
      )}
    </>
  );
};

export default ErrorMessage;
