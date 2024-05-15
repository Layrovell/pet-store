import React, { useCallback } from 'react';

import IconButton from './IconButton';
import Typography from './Typography';
import Stack from './Stack';
import colors from '../config/colors';
import Button from './atoms/Button';
import Icon from './atoms/Icon';

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

interface Props {
  value: number;
  setValue: (v: number) => void;
}

const PlusMinusButton: React.FC<Props> = ({ value, setValue }) => {
  const onPlus = useCallback(() => {
    if (value < MAX_ITEMS) {
      setValue(value + 1);
    }
  }, [value]);

  const onMinus = useCallback(() => {
    if (value > MIN_ITEMS) {
      setValue(value - 1);
    }
  }, [value]);

  return (
    <Stack
      direction={'row'}
      spacing={3}
      style={{
        paddingVertical: 6,
        alignItems: 'center',
      }}
    >
      <Button onPress={onMinus} size='tiny' appearance='ghost' accessoryLeft={<Icon name='minus-outline' />} />
      <Typography>{value}</Typography>
      <Button onPress={onPlus} size='tiny' appearance='ghost' accessoryLeft={<Icon name='plus-outline' />} />
    </Stack>
  );
};

export default PlusMinusButton;
