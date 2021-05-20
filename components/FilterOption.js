import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';

export default class FilterOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnPress = () => {
    this.props.onPressIt(this.props.name);
  };
  render() {
    const {name} = this.props;
    return (
      <View style={{height: '100%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            height: 32,
            padding: SIZES.padding,
            marginRight: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: this.props.isChoose ? '#A9E2F3' : '#cde5fc',
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          onPress={this.handleOnPress}>
          <Text style={{color: COLORS.black, ...FONTS.body4}}>{name}</Text>
          <Image
            source={icons.down}
            style={{width: 12, height: 12, marginLeft: SIZES.base}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
