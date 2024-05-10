import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import AppButton from '../components/Button';
import Slider from '../components/Slider';
import routes from '../navigation/routes';
import colors from '../config/colors';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <Slider />
      <AppButton
        radius={30}
        size='lg'
        fullWidth
        title='Get Started'
        onPress={() => navigation.navigate(routes.LOGIN)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
});

export default WelcomeScreen;
