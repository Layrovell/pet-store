import React, { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { KeyValuePair } from '@type/common';

interface Props {
  children: React.ReactNode;
  expanded: boolean;
  styles?: KeyValuePair;
}

const CollapsibleContainer: React.FC<Props> = ({ children, expanded }) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsibleStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded]);

  return (
    <Animated.View style={[collapsibleStyle, { overflow: 'hidden' }]}>
      <View style={{ position: 'absolute' }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

export default CollapsibleContainer;
