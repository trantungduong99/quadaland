import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, TextInput} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';

class SignInScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{height: 200, width: 200, marginTop: 30}}
        />
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Username"
            style={{marginLeft: SIZES.padding, ...FONTS.body3}}></TextInput>
        </View>
        <View
          style={{
            width: '80%',
            marginTop: 20,
            height: 50,
            borderRadius: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
            justifyContent:"center",
            alignItems:"flex-start"
          }}>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={{marginLeft: SIZES.padding, ...FONTS.body3}}></TextInput>
        </View>
      </View>
    );
  }
}

export default SignInScreen;
