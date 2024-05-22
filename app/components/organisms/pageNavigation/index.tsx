import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Typography from '@components/Typography';
import Input from '@atoms/Input';
import Icon from '@atoms/Icon';
import Stack from '@components/Stack';

interface Props {
  routeName?: string;
  leftAction?: JSX.Element;
  rightAction?: JSX.Element;
  search?: boolean;
}

const PageHeaderNavigation: React.FC<Props> = ({ routeName, leftAction, rightAction, search }) => {
  const [value, setValue] = useState('');

  const handleClear = () => {
    setValue('');
  };

  const isAction = leftAction || rightAction;

  return (
    <Stack spacing={4} style={styles({ isAction }).container}>
      <>
        {leftAction}

        <View style={{ flex: 1, height: 50, justifyContent: routeName ? 'center' : 'space-between' }}>
          {search && (
            <Input
              handleClear={handleClear}
              value={value}
              onChangeText={(text) => setValue(text)}
              placeholder='Search Product'
              accessoryLeft={<Icon name='search-outline' />}
            />
          )}
          {routeName && (
            <Typography variant='h4' textAlign='center'>
              {routeName}
            </Typography>
          )}
        </View>

        {rightAction}
      </>
    </Stack>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: 46,
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 16,
    },
  });

export default PageHeaderNavigation;
