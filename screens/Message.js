import React from 'react';
import {Text, View} from 'react-native';
import Slider from '@react-native-community/slider';

const Message = () => {
  return (
    <View>
      <Text>Message</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={1}
        maximumValue={10}
        minimumTrackTintColor="#00AEDD"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

export default Message;
