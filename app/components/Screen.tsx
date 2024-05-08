// import Constants from 'expo-constants';
import { Dimensions, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: any;
}

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + horizontalScale(size) * factor;

const Screen: React.FC<Props> = ({ children, style }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
  },
});

export default Screen;
