import React from 'react';
import { ImageBackground, View, StyleSheet, Text, Button } from 'react-native';

import AppButton from '../components/Button';
import routes from '../navigation/routes';
import Logo from '../components/Logo';
import Stack from '../components/Stack';

const WelcomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      // source={{
      //   // uri: 'https://images.unsplash.com/photo-1615233500022-01d251f3eb33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGdvbGRlbiUyMHJldHJpZXZlcnxlbnwwfHwwfHx8MA%3D%3D',
      //   // uri: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGV0fGVufDB8fDB8fHww',
      // }}
      style={styles.background}
      blurRadius={0}
      resizeMode='cover'
    >
      <View style={styles.logoContainer}>
        <Logo size={80} />
        <Text style={[styles.tagline, { fontFamily: 'SpaceMono' }]}>Find something for your pet!</Text>
      </View>

      {/* <Button title='getUser' onPress={fetchData} /> */}

      {/* the size of View determined by the size of the content */}
      <Stack spacing={3} style={styles.buttonContainer}>
        <AppButton title={'Login'} size='lg' fullWidth onPress={() => navigation.navigate(routes.LOGIN)} />
        <AppButton
          title={'Register'}
          size='lg'
          fullWidth
          onPress={() => navigation.navigate(routes.REGISTER)}
          color='secondary'
        />
      </Stack>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // StyleSheet API: validate styles prop names. | if style inline - we won't get an error
  background: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // need to calculate the height of the status bar
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
  tagline: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
