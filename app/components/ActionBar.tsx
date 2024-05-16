import React from 'react';

import Typography from './Typography';
import Stack from './Stack';

interface Props {
  title: string;
  direction?: string;
  children?: JSX.Element | any;
}

const ActionBar: React.FC<Props> = ({ title, direction = 'row', children }) => {
  return (
    <Stack direction='row' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant='h5'>{title}</Typography>
      {children}
    </Stack>
  );
};

export default ActionBar;
