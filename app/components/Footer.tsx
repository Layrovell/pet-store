import React from 'react';
import { StyleSheet } from 'react-native';

import Stack from './Stack';
import colors from '../config/colors';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Footer: React.FC<Props> = ({ children }) => {
  return (
    <Stack spacing={4} style={styles.footer}>
      {children}
    </Stack>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    paddingTop: 26,
    borderColor: colors.grey[10],
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});

export default Footer;
