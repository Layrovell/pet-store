export const getSnackBarStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'rgba(77, 214, 62, 0.9)';
    case 'error':
      return 'rgba(219, 43, 36, 0.9)';
    case 'warning':
      return 'rgba(219, 155, 46, 0.9)';
    case 'info':
      return 'rgba(0, 158, 219, 0.9)';
    default:
      return 'rgba(0, 0, 0, 0.8)';
  }
};
