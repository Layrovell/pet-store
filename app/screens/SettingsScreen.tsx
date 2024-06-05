import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import SectionList from '@components/organisms/SectionList';
import { StackScreenProps } from '@react-navigation/stack';
import useAuthService from '../controllers/auth/service';
import { RootStackParamList } from '@type/navigation';
import routes from '../navigation/routes';
import Button from '../components/atoms/Button';

const DATA = [
  {
    title: 'Account',
    data: [
      { title: 'Account', href: routes.ACCOUNT, icon: <MaterialIcons name='person-outline' size={28} /> },
      { title: 'Address', href: routes.ACCOUNT, icon: <MaterialIcons name='home' size={28} /> },
      { title: 'Notification', href: routes.ACCOUNT, icon: <MaterialIcons name='notifications-none' size={28} /> },
      { title: 'Payment Method', href: routes.ACCOUNT, icon: <MaterialIcons name='wallet' size={28} /> },
      { title: 'Privacy', href: routes.PRIVACY_POLICY, icon: <MaterialIcons name='priority-high' size={28} /> },
      { title: 'Security', href: routes.SECURITY, icon: <MaterialIcons name='key' size={28} /> },
    ],
  },
  {
    title: 'Help',
    data: [
      { title: 'Contact Us', href: routes.ACCOUNT, icon: <MaterialIcons name='local-phone' size={28} /> },
      { title: 'FAQ', href: routes.ACCOUNT, icon: <MaterialIcons name='help-outline' size={28} /> },
    ],
  },
];

type Props = StackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuthService();

  const handleLogout = async () => {
    logout();
  };

  return (
    <Screen>
      <SectionList dataset={DATA} navigation={navigation} />

      <Button size='large' appearance='outline' onPress={handleLogout}>
        Log Out
      </Button>
    </Screen>
  );
};

export default SettingsScreen;
