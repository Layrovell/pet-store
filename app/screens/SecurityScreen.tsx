import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import SectionList from '@components/organisms/SectionList';
import { RootStackParamList } from '@type/navigation';
import Icon from '@components/atoms/Icon';
import Screen from '@components/Screen';
import routes from 'navigation/routes';

const DATA = [
  {
    title: 'Security',
    data: [
      { title: 'Change Password', href: routes.CHANGE_PASSWORD, icon: <Icon name='keypad-outline' size={28} /> },
      { title: 'Change Email', href: routes.CHANGE_EMAIL, icon: <Icon name='email-outline' size={28} /> },
    ],
  },
];

type Props = StackScreenProps<RootStackParamList, 'Security'>;

const SecurityScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <SectionList dataset={DATA} navigation={navigation} />
    </Screen>
  );
};

export default SecurityScreen;
