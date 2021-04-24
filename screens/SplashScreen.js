import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity,StatusBar} from 'react-native';
import {icons, FONTS, COLORS, images, SIZES} from '../constants';


class SplashScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}> 
        <StatusBar backgroundColor="#F2F2F2" barStyle="dark-content" />
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{height: 350, width: 350}}
        />
        <Text style={{color: COLORS.black, ...FONTS.body3}}>
          Chào mừng bạn đến với QuadaLand!
        </Text>
        <TouchableOpacity
          style={{
            height: 60,
            width: '80%',
            backgroundColor: '#00ADEE',
            borderRadius: 20,
            marginTop: 70,
          }}
          onPress={()=>{this.props.navigation.navigate("SignInScreen")}}
          >
          <View
            style={{
              flex: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h4}}>ĐĂNG NHẬP</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: '80%',
            borderRadius: 20,
            marginTop: SIZES.padding,
            borderColor: '#00ADEE',
            borderWidth: 1,
          }}
          onPress={()=>{this.props.navigation.navigate("SignUpScreen") }}
          >
          <View
            style={{
              flex: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#00ADEE', ...FONTS.h4}}>ĐĂNG KÝ</Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.darkgray,
            ...FONTS.body4,
            marginTop: 15,
            textDecorationLine: 'underline',
          }}>
          Tiếp tục với tư cách khách
        </Text>
      </View>
    );
  }
}

export default SplashScreen;
