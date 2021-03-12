import React from 'react';
import {Text, View, TouchableOpacity,Image} from 'react-native';
import {SIZES, COLORS,FONTS} from '../constants';
import {useNavigation} from '@react-navigation/native';

const MenuItem = ({icon, name, target}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, flexDirection: 'column', paddingTop: SIZES.padding}}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          navigation.navigate(target)
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            backgroundColor: COLORS.lightGray,
            borderRadius: 15,
            padding: SIZES.base,
          }}>
          <Image
            source={icon}
            style={{height: '100%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: COLORS.black, ...FONTS.body4}}>{name}</Text>
      </View>
    </View>
  );
};

export default MenuItem;
