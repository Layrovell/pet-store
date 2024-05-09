import React from 'react';
import { StyleSheet } from 'react-native';

import { KeyValuePair } from '../interface/common';
import Typography from './Typography';
import Stack from './Stack';

interface Props {
  data: KeyValuePair;
}

const Attributes: React.FC<Props> = ({ data }) => {
  if (!data) {
    return null;
  }

  const dataToRender = Object.entries(data).map(([k, v]) => ({ k, v }));

  return (
    <Stack spacing={2}>
      {dataToRender.map((item, index) => (
        <Stack direction='row' key={index} spacing={2}>
          <Typography variant='body2' style={styles.key}>{item.k}:</Typography>
          <Typography variant='body2'>{item.v}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

const styles = StyleSheet.create({
  key: {
    textTransform: 'capitalize',
  },
});

export default Attributes;
