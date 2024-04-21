import { Button, StyleSheet, Text } from 'react-native';
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import colors from '../config/colors';
import Screen from '../components/Screen';
import useAuthService from '../services/auth/service';
import List from '../components/product/List';

const mockData = [
  {
    id: 0,
    category: {
      id: 0,
      name: 'dog',
    },
    name: 'doggie',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 0,
        name: 'dog111',
      },
    ],
    status: 'available',
  },
  {
    id: 1,
    category: {
      id: 1,
      name: 'cat',
    },
    name: 'kitten',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 1,
        name: 'string',
      },
    ],
    status: 'available',
  },
  {
    id: 2,
    category: {
      id: 2,
      name: 'rat',
    },
    name: 'hamster',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 2,
        name: 'string',
      },
    ],
    status: 'sold',
  },
  {
    id: 3,
    category: {
      id: 3,
      name: 'bird',
    },
    name: 'eagle',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 3,
        name: 'string',
      },
    ],
    status: 'available',
  },
  {
    id: 4,
    category: {
      id: 4,
      name: 'rat',
    },
    name: 'squirrel',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 4,
        name: 'string',
      },
    ],
    status: 'pending',
  },
  {
    id: 5,
    category: {
      id: 5,
      name: 'bird',
    },
    name: 'ara',
    photoUrls: [
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    tags: [
      {
        id: 5,
        name: 'string',
      },
    ],
    status: 'sold',
  },
];

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const DummyScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuthService();

  const deleteToken = async () => {
    logout();
  };

  return (
    <Screen style={styles.screen}>
      <Button title='Logout' onPress={deleteToken} />
      <List dataset={mockData} title='Pets' navigation={navigation} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default DummyScreen;
