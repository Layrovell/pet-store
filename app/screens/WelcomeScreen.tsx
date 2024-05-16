import React from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '../components/Screen';
import Slider from '../components/Slider';
import routes from '../navigation/routes';
import Button from '../components/atoms/Button';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Screen>
      <Slider />
      <Button
        onPress={() => navigation.navigate(routes.LOGIN)}
        size='large'
      >
        Get Started
      </Button>
    </Screen>
  );
};

export default WelcomeScreen;
