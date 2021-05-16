import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {AccountItem} from '../components';
import {readMyProfile} from '../services/authService';
import asyncStorage from '@react-native-community/async-storage';

const Account = ({navigation}) => {
  // const handleDataToProfile = async () => {
  //   readMyProfile()
  //     .then((response) => {
  //       const {full_name, phone, email, address} = response.data;
  //       navigation.navigate('MyProfile', {
  //         full_name: full_name,
  //         phone: phone,
  //         email: email,
  //         address: address,
  //       });
  //     })
  //     .catch((e) => {
  //       navigation.navigate('MyProfile', {
  //         full_name: "",
  //         phone: "",
  //         email: "",
  //         address: "",
  //       });
  //       console.log(e);
  //     });
  // };
  return (
    <View
      style={{flex: 1, backgroundColor: '#D8D8D8', flexDirection: 'column'}}>
      <View
        style={{
          height: '7%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: '#FAFAFA',
        }}>
        <Text style={{color: COLORS.black, ...FONTS.h3}}>Tài khoản</Text>
      </View>
      <View
        style={{
          marginTop: SIZES.base,
          height: 70,
          backgroundColor: '#FAFAFA',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1,
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('MyProfile')
          }}>
          <Image
            source={icons.user}
            resizeMode="cover"
            style={{
              height: 46,
              width: 46,
              marginRight: SIZES.padding,
            }}
          />
          <View
            style={{
              
              justifyContent: 'center',
              height: '100%',
            }}>
            <Text style={{color: COLORS.primary, ...FONTS.body3}}>
              Xem trang cá nhân của bạn
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: SIZES.base,
          backgroundColor: '#FAFAFA',
          height: '100%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,

          elevation: 2,
        }}>
        <AccountItem
          item={icons.save}
          title="Nội dung đã lưu"
          target="noidungdaluu"
        />
        <AccountItem item={icons.account} title="Tiện ích" target="tienich" />
        <AccountItem item={icons.headphones} title="Liên hệ" target="lienhe" />
        <AccountItem item={icons.settings} title="Cài đặt" target="caidat" />
        <AccountItem
          item={icons.password}
          title="Đổi mật khẩu"
          target="changePassword"
        />
        <AccountItem item={icons.shutdown} title="Đăng xuất" target="signOut" />
        <View style={{alignItems: 'center', marginTop: SIZES.base}}>
          <Text style={{color: COLORS.secondary, ...FONTS.body5}}>
            Version 3.3.8
          </Text>
          <Text style={{color: COLORS.secondary, ...FONTS.body5}}>
            © 2021 Hwilee All Rights Reserved
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Account;
