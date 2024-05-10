import React from 'react';
import { StyleSheet, SectionList, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '../components/Screen';
import Typography from '../components/Typography';
import Stack from '../components/Stack';
import AppButton from '../components/Button';
import colors from '../config/colors';
import useAuthService from '../controllers/auth/service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import routes from '../navigation/routes';

const DATA = [
  {
    title: 'Account',
    data: [
      { title: 'Account', href: routes.ACCOUNT, icon: <MaterialIcons name='person-outline' size={28} /> },
      { title: 'Address', href: routes.ACCOUNT, icon: <MaterialIcons name='home' size={28} /> },
      { title: 'Notification', href: routes.ACCOUNT, icon: <MaterialIcons name='notifications-none' size={28} /> },
      { title: 'Payment Method', href: routes.ACCOUNT, icon: <MaterialIcons name='wallet' size={28} /> },
      { title: 'Privacy', href: routes.ACCOUNT, icon: <MaterialIcons name='priority-high' size={28} /> },
      { title: 'Security', href: routes.ACCOUNT, icon: <MaterialIcons name='key' size={28} /> },
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

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuthService();

  const handleLogout = async () => {
    logout();
  };

  return (
    <Screen>
      <SectionList
        sections={DATA}
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
                <MaterialIcons name='keyboard-arrow-right' size={24} />
              </Stack>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { title } }) => <Typography style={{ fontWeight: 700 }}>{title}</Typography>}
      />
      <AppButton
        radius={30}
        size='lg'
        fullWidth
        title='Log Out'
        onPress={handleLogout}
        isOutlined
      />
    </Screen>
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

export default SettingsScreen;
