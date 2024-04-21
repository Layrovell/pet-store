import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import IconButton from '../components/IconButton';
import routes from '../navigation/routes';
import AppButton from '../components/Button';
import Status from '../components/Status';
import Stack from '../components/Stack';
import ImageCarousel from '../components/ImageCarousel';

interface Props {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const item = route.params;
  console.log('product:', item);

  return (
    <Screen style={styles.screen}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <ImageCarousel items={item.photoUrls} />

        <View style={styles.detailsContainer}>
          <View style={styles.horizontal}>
            <Text style={styles.title}>{item.name}</Text>
            <IconButton name={'heart'} size={24} iconColor={colors.primary} />
          </View>

          <Stack spacing={1}>
            <Text style={styles.paragraph}>Category: {item.category}</Text>
            <Status status={item.status} />
          </Stack>

          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>{item.price}</Text>
            <AppButton
              title='Buy'
              onPress={() => {
                navigation.navigate(routes.CART_DETAILS);
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    marginVertical: 40,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  paragraph: {},
  title: {
    fontSize: 24,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: colors.primary,
    marginBottom: 16,
  },
});

export default ProductDetailsScreen;
