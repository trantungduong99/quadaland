import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';

export default class SearchTag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOnPress = () => {
    this.props.onPress(this.props.searchRef);
  };
  render() {
    const {name} = this.props;
    return (
      <View style={{height: '100%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            height: 30,
            padding: SIZES.base,
            marginRight: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 25,
          }}
          onPress={this.handleOnPress}>
          <Text style={{color: COLORS.primary, ...FONTS.body4}}>{name}</Text>
          <Image
            source={icons.cancel}
            style={{
              height: 15,
              width: 15,
              tintColor: COLORS.primary,
              marginLeft: SIZES.base,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
