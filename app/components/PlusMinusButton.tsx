import React from 'react';

import IconButton from './IconButton';
import Typography from './Typography';
import Stack from './Stack';
import colors from '../config/colors';

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

interface Props {
  value: number;
  setValue: (v: number) => void;
}

const PlusMinusButton: React.FC<Props> = ({ value, setValue }) => {
  const onPlus = () => {
    if (value <= MAX_ITEMS) {
      setValue(value + 1);
    }
  };

  const onMinus = () => {
    if (value > MIN_ITEMS) {
      setValue(value - 1);
    }
  };

  return (
    <Stack
      direction={'row'}
      spacing={2}
      style={{
        backgroundColor: colors.background,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 24,
      }}
    >
      <IconButton onPress={onMinus} name={'horizontal-rule'} size={20} />
      <Typography>{value}</Typography>
      <IconButton onPress={onPlus} name={'add'} size={20} />
    </Stack>
  );
};

export default PlusMinusButton;
