import React from 'react';
import { ScrollView } from 'react-native';

import Screen from '@components/Screen';
import Typography from '@components/Typography';
import Stack from '@components/Stack';

interface Props {}

const PrivacyScreen: React.FC<Props> = () => {
  return (
    <ScrollView>
      <Screen>
        <Stack spacing={8}>
          <Stack spacing={4}>
            <Typography variant='h5'>Term of Use</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum sapien sodales mi sagittis
              hendrerit. Curabitur ut lectus nec orci cursus rhoncus. Donec a ultrices risus. Mauris ut erat ut urna
              rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis
              ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis.
              Vestibulum quis scelerisque leo. Vestibulum quis porttitor tellus, non finibus nibh. Quisque ut tempor
              nulla, sed consectetur tortor. Mauris volutpat viverra arcu non laoreet. Duis eu arcu nunc. Pellentesque
              ultricies facilisis faucibus. Duis magna sem, ultricies sed scelerisque efficitur, hendrerit at arcu.
            </Typography>
          </Stack>

          <Stack spacing={4}>
            <Typography variant='h5'>PetApp Service</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum sapien sodales mi sagittis
              hendrerit. Curabitur ut lectus nec orci cursus rhoncus. Donec a ultrices risus. Mauris ut erat ut urna
              rhoncus facilisis a eu neque. Ut iaculis viverra laoreet. In interdum, augue non auctor pharetra, felis
              ante gravida ante, quis mattis quam eros non quam. Vivamus scelerisque ante nec dapibus convallis.
              Vestibulum quis scelerisque leo. Vestibulum quis porttitor tellus, non finibus nibh. Quisque ut tempor
              nulla, sed consectetur tortor. Mauris volutpat viverra arcu non laoreet. Duis eu arcu nunc. Pellentesque
              ultricies facilisis faucibus. Duis magna sem, ultricies sed scelerisque efficitur, hendrerit at arcu.
            </Typography>
          </Stack>
        </Stack>
      </Screen>
    </ScrollView>
  );
};

export default PrivacyScreen;
