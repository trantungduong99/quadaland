import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {icons, SIZES, COLORS, FONTS} from '../constants';
import {signOut} from '../services/authService';
import {useAuthDispatch} from '../contexts/authContext';
import {SIGN_OUT} from '../actions/actionTypes';
import asyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const AccountItem = ({item, title, target}) => {
  const navigation = useNavigation();
  const dispatch = useAuthDispatch();
  const handleTarget = async (target) => {
    if (target == 'signOut') {
      const token = await asyncStorage.getItem('token');
      console.log('token logout: ', token);
      try {
        await signOut(token);
        dispatch({type: SIGN_OUT});
      } catch (e) {
        console.log('Log out error. Component AcountItem.js');
      }
    }
    if (target == 'changePassword') {
      navigation.navigate('ChangePassword');
    }
    if (target == 'MyProperty') {
      const username = await asyncStorage.getItem('username');
      navigation.navigate('MyProperty', {username: username});
    }
    if (target == 'mygallery') {
      navigation.navigate('MyGallery');
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}
        onPress={() => {
          handleTarget(target);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item}
            style={{height: 22, width: 22, marginRight: SIZES.padding}}
            resizeMode="contain"
          />
          <Text style={{color: COLORS.black, ...FONTS.body4}}>{title}</Text>
        </View>
        <Image
          source={icons.right}
          style={{height: 14, width: 14, tintColor: COLORS.secondary}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          height: 2,
          backgroundColor: '#D8D8D8',
          marginHorizontal: SIZES.padding,
        }}></View>
    </View>
  );
};
export default AccountItem;
