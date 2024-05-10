import React from 'react';
import { ImageBackground } from 'react-native';

import Stack from './Stack';
import Typography from './Typography';
import colors from '../config/colors';

interface Props {
  title: string;
  subtitle?: string;
}

const Banner: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <ImageBackground
      style={{ width: 'auto', height: 160, justifyContent: 'center', alignItems: 'center' }}
      source={require('../assets/bg-orange.png')}
    >
      <Stack spacing={2}>
        <Typography variant='h5' color={colors.white}>
          {title}
        </Typography>
        <Typography variant='body2' color={colors.white}>
          {subtitle}
        </Typography>
      </Stack>
    </ImageBackground>
  );
};

export default Banner;
