import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, Animated, useWindowDimensions } from 'react-native';

interface Props {
  items: string[];
}

const ImageCarousel: React.FC<Props> = ({ items }) => {
  console.log('items:', items);

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
      >
        {items.map((image, imageIndex) => {
          return (
            <View style={{ width: windowWidth, height: 360 }} key={imageIndex}>
              <ImageBackground source={{ uri: image }} style={styles.card}></ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {items.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [windowWidth * (imageIndex - 1), windowWidth * imageIndex, windowWidth * (imageIndex + 1)],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });
          return <Animated.View key={imageIndex} style={[styles.normalDot, { width }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginBottom: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImageCarousel;
