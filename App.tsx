import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const collorArray = [
  '#f00000',
  '#ff7f00',
  '#ffff00',
  '#00ff00',
  '#0000ff',
  '#4b0082',
  '#9400d3',
];

const App = () => {
  const rotateContainerState = useRef(useSharedValue(0)).current;
  const borderRadBox = useRef(useSharedValue(45 / 4)).current;
  const circleDiameter = 200;

  const containerRotate = useAnimatedStyle(() => {
    return {
      opacity: 1,
      transform: [{rotate: `${rotateContainerState.value}deg`}],
    };
  });

  const boxTransform = useAnimatedStyle(() => {
    return {
      borderRadius: borderRadBox.value,
    };
  });

  const rotateContainerFunc = () => {
    rotateContainerState.value = withRepeat(
      withSequence(
        withTiming(160, {duration: 2000, easing: Easing.linear}),
        withTiming(-160, {duration: 4000, easing: Easing.linear}),
        withTiming(0, {duration: 2000, easing: Easing.linear}),
      ),
      -1,
    );
  };

  const borderRadiusBoxFunc = () => {
    borderRadBox.value = withRepeat(
      withSequence(
        withTiming(45 / 2, {duration: 2000}),
        withTiming(0, {duration: 4000}),
        withTiming(45 / 4, {duration: 2000}),
      ),
      -1,
    );
  };

  useEffect(() => {
    rotateContainerFunc();
    borderRadiusBoxFunc();
  }, []);

  return (
    <View style={Styles.container}>
      <Animated.View
        style={[
          {
            height: circleDiameter,
            width: circleDiameter,
            borderRadius: circleDiameter / 2,
            justifyContent: 'center',
            alignItems: 'center',
          },
          containerRotate,
        ]}>
        {collorArray.map((color, idx) => (
          <Animated.View
            key={idx}
            style={[
              Styles.box,
              {
                position: 'absolute',
                backgroundColor: color,
                transform: [
                  {rotate: `${(360 / collorArray.length) * idx}deg`},
                  {translateX: circleDiameter / 2},
                ],
              },
              boxTransform,
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default App;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {height: 45, width: 45},
});
