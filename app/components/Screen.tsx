// import Constants from 'expo-constants';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

interface Props {
  children: JSX.Element;
  style?: any;
}

const Screen: React.FC<Props> = ({ children, style }) => {
  return (
    // SafeAreaView: only work in iOS
    <SafeAreaView style={[styles.screen, style]}>
      {/* <View > style={[styles.view, style]} */}
      {children}
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // or
    // paddingTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
