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

const BoxT = ({
  color,
  index,
  circleDiameter,
}: {
  color: string;
  index: number;
  circleDiameter: number;
}) => {
  const borderRadBox = useRef(useSharedValue(45 / 4)).current;

  const borderRadiusBoxFunc = () => {
    borderRadBox.value = withRepeat(
      withSequence(
        withTiming(45 / 2, {duration: 1000, easing: Easing.linear}),
        withTiming(0, {duration: 2000, easing: Easing.linear}),
        withTiming(45 / 4, {duration: 1000, easing: Easing.linear}),
      ),
      -1,
    );
  };

  const boxTransform = useAnimatedStyle(() => {
    return {
      borderRadius: borderRadBox.value,
    };
  });

  useEffect(() => {
    borderRadiusBoxFunc();
  }, []);

  return (
    <Animated.View
      key={index}
      style={[
        Styles.box,
        {
          position: 'absolute',
          backgroundColor: color,
          transform: [
            {rotate: `${(360 / collorArray.length) * index}deg`},
            {translateX: circleDiameter / 2},
          ],
        },
        boxTransform,
      ]}
    />
  );
};

const App = () => {
  const rotateContainerState = useRef(useSharedValue(0)).current;
  const rotateText = useRef(useSharedValue(0)).current;
  const circleDiameter = 200;

  const containerRotate = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotateContainerState.value}deg`}],
    };
  });
  const StyletextRotate = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotateText.value}deg`}],
    };
  });

  const rotateContainerFunc = () => {
    rotateContainerState.value = withRepeat(
      withSequence(
        withTiming(160, {duration: 1000, easing: Easing.linear}),
        withTiming(-160, {duration: 2000, easing: Easing.linear}),
        withTiming(0, {duration: 1000, easing: Easing.linear}),
      ),
      -1,
    );
  };
  const rotateTextFunc = () => {
    rotateText.value = withRepeat(
      withSequence(
        withTiming(-160, {duration: 1000, easing: Easing.linear}),
        withTiming(160, {duration: 2000, easing: Easing.linear}),
        withTiming(0, {duration: 1000, easing: Easing.linear}),
      ),
      -1,
    );
  };

  useEffect(() => {
    rotateContainerFunc();
    rotateTextFunc();
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
        <Animated.Text style={[{fontWeight: 'bold'}, StyletextRotate]}>
          Loading
        </Animated.Text>
        {collorArray.map((color, idx) => (
          <BoxT
            key={idx}
            color={color}
            index={idx}
            circleDiameter={circleDiameter}
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
