import React from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import {images, icons, SIZES, FONTS, COLORS} from '../constants';
import {dummmyShoppingData} from '../data/Data';
import ShoppingItem from './ShoppingItem'

const Shopping = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: SIZES.font}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: COLORS.black, ...FONTS.h2}}>Mua bán</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              console.log('Xem tat ca');
            }}>
            <Text style={{color: COLORS.primary, ...FONTS.body4}}>
              Xem tất cả
            </Text>
            <Image
              source={icons.right_arrow}
              style={{
                height: 18,
                width: 18,
                tintColor: COLORS.primary,
                marginLeft: SIZES.base,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:1,marginTop:SIZES.base,height:"100%"}}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dummmyShoppingData}
            keyExtractor={(item)=>"keyShopping"+item.id}
            renderItem={({item})=>{return(<ShoppingItem item={item} />)}}
          />
        </View>
      </View>
    </View>
  );
};

export default Shopping;
