import React from 'react';
import {Text, View, TouchableOpacity,Image} from 'react-native';
import {icons, SIZES, COLORS,FONTS} from '../constants';

const AccountItem = ({item, title, target}) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={item}
            style={{height: 22, width: 22, marginRight: SIZES.padding}}
            resizeMode="contain"
          />
          <Text style={{color: COLORS.black, ...FONTS.body4}}>
            {title}
          </Text>
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
