import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {SIZES, FONTS, COLORS, icons, images} from '../constants';
import {useNavigation} from '@react-navigation/native';
const ShoppingItem = ({item}) => {
  const navigation = useNavigation()
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
            navigation.navigate("PropertyDetail",{item:item})
          }}>
          <Image
            source={{uri:'https://random.imagecdn.app/1200/800'}}
            style={{width: SIZES.width * 0.8, height: "97%", borderRadius: 10}}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: '50%',
              width: SIZES.width * 0.8,
              backgroundColor: '#FAFAFA',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: SIZES.padding,
            }}>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={{color:COLORS.primary,...FONTS.body5}} >{item.details.price}</Text>
              <Text style={{color:COLORS.primary,...FONTS.body5}} numberOfLines={1}>{item.details.area}</Text>
            </View>
            <Text style={{color: COLORS.black, ...FONTS.h4}} numberOfLines={1}>
              {item.details.title}
            </Text>
            <Text style={{color: COLORS.black, ...FONTS.body4}} numberOfLines={2}>
              {item.details.address}
            </Text>
          </View>
          <View
            style={{
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
  );
};

export default ShoppingItem;
