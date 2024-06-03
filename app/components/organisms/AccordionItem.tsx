import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Typography from '@components/Typography';
import Stack from '@components/Stack';
import Icon from '@atoms/Icon';
import { firstUpperLetter } from 'utils/stringFormatter';

interface Props {
  title: string;
  children: JSX.Element;
}

const AccordionItem: React.FC<Props> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(true);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const body = <View>{children}</View>;

  return (
    <Stack spacing={3} style={{ marginVertical: 8 }}>
      <TouchableOpacity onPress={onItemPress} style={styles.titleContainer}>
        <Typography variant='h5'>{firstUpperLetter(title)}</Typography>
        <Icon name={expanded ? 'minus-outline' : 'plus-outline'} />
      </TouchableOpacity>
      <>{expanded && body}</>
    </Stack>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AccordionItem;
