import React from 'react';
import {Text, View, TouchableOpacity,Image} from 'react-native';
import {SIZES, COLORS,FONTS} from '../constants';
import {useNavigation} from '@react-navigation/native';

const MenuItem = ({icon, name, target}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, flexDirection: 'column', paddingTop: SIZES.padding}}>
      <TouchableOpacity
        style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
          navigation.navigate(target)
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 45,
            height: 45,
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
      <View style={{flex: 0.3,alignItems:"center"}}>
        <Text style={{marginTop:0,color: COLORS.black, ...FONTS.body5}}>{name}</Text>
      </View>
    </View>
  );
};

export default MenuItem;
