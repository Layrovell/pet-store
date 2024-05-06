import React, { createRef, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, TouchableOpacity, FlatList } from 'react-native';

import { SVGIllustrationV1, SvgIllustrationV2, SvgIllustrationV3 } from '../theme/CustomIcons';
import Typography from './Typography';
import colors from '../config/colors';

// can be customizable upon our needs
const data = [
  {
    title: 'Meet your animal needs here',
    index: 0,
    icon: SVGIllustrationV1,
    subtitle: 'Get interesting promos here, register your account immediately so you can meet your animal needs.',
  },
  {
    title: 'Meet your animal needs here',
    index: 1,
    icon: SvgIllustrationV2,
    subtitle: 'Get interesting promos here, register your account immediately so you can meet your animal needs.',
  },
  {
    title: 'Meet your animal needs here',
    index: 2,
    icon: SvgIllustrationV3,
    subtitle: 'Get interesting promos here, register your account immediately so you can meet your animal needs.',
  },
];

interface Props {}

const Slider: React.FC<Props> = () => {
  const windowWidth = useWindowDimensions().width - 32;
  const slider: any = createRef();

  const [sliderState, setSliderState] = useState({
    item: 0,
    offset: 0,
  });

  const slideChanged = (e: any) => {
    const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);

    setSliderState({
      item: item,
      offset: item * windowWidth,
    });
  };

  const renderer = ({ item }: any) => {
    const { icon: Icon } = item;

    return (
      <View style={{ width: windowWidth }}>
        <View style={{ ...styles.slide }}>
          <Typography variant='h1'>{item.title}</Typography>
          <Icon />
          <Typography variant='body2'>{item.subtitle}</Typography>
        </View>
      </View>
    );
  };

  const button = (direction: string) => (
    <TouchableOpacity
      onPress={() =>
        slider.current.scrollToOffset({
          offset: direction === 'BACK' ? sliderState.offset - windowWidth : sliderState.offset + windowWidth,
          animated: true,
        })
      }
    >
      <Text style={styles.buttons}>{direction}</Text>
    </TouchableOpacity>
  );

  const dots = () => (
    <View style={styles.dotGroup}>
      {data.map((_, index) => (
        <View key={index} style={[styles.dot, sliderState.item === index ? styles.dotActive : null]} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderer}
        ref={slider}
        keyExtractor={({ index }: any) => index}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={slideChanged} // Fire slideChanged on scroll event
        getItemLayout={(_, index) => ({
          length: windowWidth,
          offset: windowWidth * index,
          index,
        })} // For optimization to eliminate recurred measurement calculations
      />
      <View style={styles.controls}>
        {dots()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    position: 'absolute',
    width: '100%',
    bottom: '15%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#E5E4E3',
  },
  dotActive: {
    backgroundColor: colors.secondary.main,
  },
  buttons: {
    fontSize: 14,
    marginHorizontal: 14,
    padding: 15,
  },
});

export default Slider;
