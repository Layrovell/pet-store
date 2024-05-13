import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, ImageBackground, Animated, useWindowDimensions } from 'react-native';

interface Props {
  items: string[];
}

const IMG_HEIGHT = 300;

const ImageCarousel: React.FC<Props> = ({ items }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  const scaleAnimation = (imageIndex: number) => {
    return scrollX.interpolate({
      inputRange: [(imageIndex - 1) * windowWidth, imageIndex * windowWidth, (imageIndex + 1) * windowWidth],
      outputRange: [1, 1, 0.9],
      extrapolate: 'clamp',
    });
  };

  const paginationDotAnimation = (imageIndex: number) => {
    return scrollX.interpolate({
      inputRange: [windowWidth * (imageIndex - 1), windowWidth * imageIndex, windowWidth * (imageIndex + 1)],
      outputRange: [8, 16, 8],
      extrapolate: 'clamp',
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
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
            <Animated.View
              style={{
                width: windowWidth,
                height: IMG_HEIGHT,
                transform: [{ scale: scaleAnimation(imageIndex) }],
              }}
              key={imageIndex}
            >
              <ImageBackground source={{ uri: image }} style={styles.card}></ImageBackground>
            </Animated.View>
          );
        })}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {items.map((image, imageIndex) => {
          return (
            <Animated.View
              key={imageIndex}
              style={[styles.normalDot, { width: paginationDotAnimation(imageIndex) }]}
            />
          );
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
