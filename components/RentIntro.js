import React ,{useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity, Image} from 'react-native';
import {images, icons, SIZES, FONTS, COLORS} from '../constants';
import {dummyRentData} from '../data/Data';
import RentIntroItem from './RentIntroItem';
import {useNavigation} from '@react-navigation/native';

const RentIntro = () => {
  useEffect(()=>{
    console.log("Đã didmount rent");
  },[])
  const navigation = useNavigation()
  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: SIZES.font}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: COLORS.black, ...FONTS.h2}}>Cho thuê</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            onPress={() => {
              navigation.navigate("Rent")
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
            data={dummyRentData}
            keyExtractor={(item)=>"keyShopping"+item.id}
            renderItem={({item})=>{return(<RentIntroItem item={item} />)}}
          />
        </View>
      </View>
    </View>
  );
};

export default RentIntro;
