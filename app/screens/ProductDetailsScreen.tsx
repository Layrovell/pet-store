import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppButton from '../components/Button';
import Typography from '../components/Typography';
import Stack from '../components/Stack';
import ImageCarousel from '../components/ImageCarousel';
import Attributes from '../components/Attributes';
import PlusMinusButton from '../components/PlusMinusButton';
import Footer from '../components/Footer';
import { getRandomImages } from '../api/mock/products';

interface Props {
  route: any;
  navigation: NavigationProp<ParamListBase>;
}

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [amount, setAmount] = useState(0);

  const item = route.params;
  const imagesMock = getRandomImages();

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageCarousel items={imagesMock} />

        <Screen>
          <Stack spacing={4}>
            <Typography variant='h5' style={{ textTransform: 'capitalize' }}>
              {item.name}
            </Typography>
            <Typography variant='body2'>Category: {item.category || 'no category'}</Typography>
            <Typography variant='body3'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, aliquam? Itaque sint impedit ipsam sunt
              quo in iste quaerat distinctio, repellendus ullam nesciunt. Impedit nemo ratione incidunt quam itaque
              doloremque.
            </Typography>

            <Attributes data={item.attributes} />
          </Stack>
        </Screen>
      </ScrollView>

      <Footer>
        <View style={styles.horizontal}>
          <PlusMinusButton value={amount} setValue={setAmount} />

          <Typography variant='h2'>${item.price}</Typography>
        </View>

        <AppButton
          title='Add to Cart'
          size='lg'
          radius={30}
          color={colors.secondary.main}
          onPress={() => {
            navigation.navigate(routes.CART_DETAILS);
          }}
        />
      </Footer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

export default ProductDetailsScreen;
