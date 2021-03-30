import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {SIZES, FONTS, COLORS, icons} from '../constants';
const RentVertical = ({item}) => {
  return (
    <View>
      <View style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 120,
            marginBottom: SIZES.padding,
            marginHorizontal: SIZES.padding,
          }}>
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
              flex: 1,
              flexDirection: 'row',
              width: SIZES.width - 2 * SIZES.padding,
            }}
            onPress={() => {
              console.log('shopping' + item.id);
            }}>
            <Image
              source={item.img}
              style={{
                height: '100%',
                width: 120,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              resizeMode="cover"
            />
            <View
              style={{
                backgroundColor: '#FAFAFA',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                flex: 1,
                padding:SIZES.padding
              }}>
              <Text style={{color: COLORS.black, ...FONTS.h4}} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{color: COLORS.black, ...FONTS.body4}} numberOfLines={2}>
              {item.address}
            </Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={{color:COLORS.primary,...FONTS.body5}} >{item.price}</Text>
              <Text style={{color:COLORS.primary,...FONTS.body5}} numberOfLines={1}>{item.acreage}</Text>
            </View>
            </View>
            <View style={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor:'#D86519',
              padding: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius:10
            }}>
                <Text style={{color: COLORS.white, ...FONTS.body4,marginHorizontal:2}}>
              Hot
            </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default RentVertical;
