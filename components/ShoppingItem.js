import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {SIZES, FONTS, COLORS, icons, images} from '../constants';

const ShoppingItem = ({item}) => {
  return (
    <View style={{marginRight: SIZES.padding, marginLeft: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            shadowColor: '#00000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2.62,
            elevation: 3,
           
          }}
          onPress={() => {
            console.log('project' + item.id);
          }}>
          <Image
            source={item.img}
            style={{width: SIZES.width * 0.4, height: "97%", borderRadius: 10}}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: '50%',
              width: SIZES.width * 0.4,
              backgroundColor: '#FAFAFA',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: SIZES.padding,
            }}>
            <Text style={{color: COLORS.black, ...FONTS.h4}}>
              {item.projectName}
            </Text>
            <Text style={{color: COLORS.black, ...FONTS.body3}}>
              {item.projectAddress}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: item.status == 1 ? '#0D9B06' : '#D86519',
              padding: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.body4}}>
              Hot
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingItem;
