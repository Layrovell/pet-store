import { StyleSheet, SectionList as UISectionList, TouchableOpacity } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';

import Typography from '@components/Typography';
import Icon from '@components/atoms/Icon';
import Stack from '@components/Stack';

interface Props {
  dataset: {
    title: string;
    data: {
      title: string;
      href: string;
      icon: JSX.Element;
    }[];
  }[];
  navigation: NavigationProp<ParamListBase>;
}

const SectionList: React.FC<Props> = ({ dataset, navigation }) => {
  return (
    <UISectionList
      sections={dataset}
      keyExtractor={(item, index) => item.title + index}
      contentContainerStyle={{ gap: 28 }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate(item.href)}>
            <Stack style={styles.item}>
              <Stack spacing={3} style={styles.title}>
                {item.icon}
                <Typography variant='body2'>{item.title}</Typography>
              </Stack>
              <Icon name='arrow-ios-forward-outline' size={24} />
            </Stack>
          </TouchableOpacity>
        );
      }}
      renderSectionHeader={({ section: { title } }) => <Typography variant='h5'>{title}</Typography>}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SectionList;
