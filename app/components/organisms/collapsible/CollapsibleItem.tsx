import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import CollapsibleContainer from '@components/organisms/collapsible/CollapsibleContainer';
import Typography from '@components/Typography';
import Stack from '@components/Stack';
import Icon from '@atoms/Icon';
import { firstUpperLetter } from 'utils/stringFormatter';

interface Props {
  title: string;
  children: JSX.Element;
}

const CollapsibleItem: React.FC<Props> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  return (
    <Stack spacing={3} style={{ marginVertical: 8 }}>
      <TouchableOpacity activeOpacity={0.7} onPress={onItemPress} style={styles.titleContainer}>
        <Typography variant='h5'>{firstUpperLetter(title)}</Typography>
        <Icon name={expanded ? 'minus-outline' : 'plus-outline'} />
      </TouchableOpacity>

      <CollapsibleContainer styles={styles.children} expanded={expanded}>
        {children}
      </CollapsibleContainer>
    </Stack>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  children: {
    marginHorizontal: 8,
  },
});

export default CollapsibleItem;
